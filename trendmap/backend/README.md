# Backend

## Instructions to run locally
- make sure you have redis installed
  - to have personal installation
    - you can install redis from here: https://redis.io/download
    - follow the instructions in the README.md file
    - if you get a `need tlc version higher than 8.5` error on the `make test` command, then run the following command: `sudo apt-get install -y tcl` and try to build again
    - run local instance of redis
  - to have redis docker conainer
    - there is a Dockerfile in `../redis/` there to build a active redis container - you can use that instead of downloading and expose the default redis port 6379 in the Dockerfile
    - a default database is populated automatically by the Dockerfile
- it is recommended to not create any of the secrets as this would query the APIs 1 hour each for reddit and every 3 hours for NewsAPI [NewsAPI has a limit of 500 calls per day], this is why a fake database is stored into redis so you can test anything that you so wish
- run `npm install` to install all needed dependencies inside this folder
- run `node app.js` or `nodemon app.js`
- all endpoints are strictly reachable through `socket.io` only - there is no REST API

## Dockerfile
- the dockerfile is used in deployment, this would not work for development testing

## For API information see `./socketio/README.md`

## For information on technologies used please see the README in top directory