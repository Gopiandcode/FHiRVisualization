# --- Base Stage ---
FROM node:6 as base
# Construct directories
RUN mkdir -p /usr/src/app
# set directory
WORKDIR /usr/src/app
# load packages
COPY ./package.json /usr/src/app/

# --- Build Stage ---
FROM base as dependancies 
# install production dependancies
# RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production
# cache the production modules
RUN cp -R node_modules prod_node_modules
# install all dependancies
RUN npm install
RUN npm install -g yarn
# package application
RUN mkdir -p /usr/src/app/backend
RUN mkdir -p /usr/src/app/frontend/src
COPY ./backend/ /usr/src/app/backend
COPY ./frontend/src /usr/src/app/frontend/src
COPY ./webpack.config.dev.js /usr/src/app/webpack.config.dev.js
COPY ./webpack.config.prod.js /usr/src/app/webpack.config.prod.js
COPY ./.babelrc /usr/src/app/.babelrc
COPY ./.eslintrc /usr/src/app/.eslintrc
COPY ./nodemon.json /usr/src/app/nodemon.jsodon
COPY ./secrets.env /usr/src/app/secrets.env
# build frontend
RUN yarn run build

# --- Dev Stage ---
FROM dependancies AS develop
EXPOSE 3000
CMD yarn run development