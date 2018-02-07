#!/bin/bash
export PORT=8080
export SECRET=hello
export MONGODB_LOCAL=mongodb://localhost:27017

mongod --fork
yarn run development
