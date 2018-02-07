# FHiR Visualization Guide
## Setup
1. If you don't have yarn installed, run ```sudo npm install -g yarn```

2. Run ```yarn install```
## Running

Before running the system, you must also define some environment variables: 

 **PORT**   ``The port to run the server on  `` 

 **SECRET**   ``` The secret used to encrypt session storage  ```

Then if running in development, also define 

 **MONGODB_LOCAL** ```the url for the mongodb used to persist data ``` 

Alternatively, see the Docker section on how to run the entire system in a Docker container, removing the need to set these values. 

### Development 
1. Run ```yarn run development```
### Production 
1. Run ```yarn run build```

2. Run ```yarn run production```


## Docker
The system has docker files defined to allow the entire system to run in set of docker containers.
To start the system in this way, run `docker-compose up`