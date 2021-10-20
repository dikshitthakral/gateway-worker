# Backend - POC
Gateway POC

## Purpose

The purpose of this service is, to subscribe horse racing events from a simulator.
This service will run in loop and subscribe events and store them in database.

## IDE recommendations and setup
- VSCode IDE

## Dev setup

- Install all the dependencies using `npm install`
- To build the server use `npm run build`
- To run the server with watch use `npm run start`
- To run the test cases in watch mode use `npm run test`
- To run the test cases with coverage `npm run test:cov`
- To run the lint and check linting errors `npm run lint`
- To linting error and checks `eslint ./src/**/*.ts --fix`

## Test

- Unit Test: We are using Jest for assertion and mocking

### Optional
- Default we are using map for caching we can extend the same with redis or other cache for scaling out with multi nodes

## Build With

- Node - The runtime server framework used
- ExpressJS - minimalist web framework for Node.js
- MongoDB - Backend Database used
- Mongoose - to model your application data with MongoDB

## Development

There is no rest end point in the code we have built a subscribe event which will subcribe horse racing events and save it into mongodb . It has different scenarios We are hitting 2 external end points of simulator to authenticate and get results.

## Observations

 "MONGO_URI": process.env.MONGO_URL || "mongodb://mongo:27017/gateway_db",
    "SIMULATOR_PASSWORD": process.env.SIMULATOR_PASSWORD || "lTgAYaLP9jRs",
    "EMAIL": process.env.EMAIL || "xyz@gmail.com",
    "SIMULATOR_BASE_URL": process.env.SIMULATOR_BASE_URL || "http://35.207.169.147",
    "SIMULATOR_AUTH_URL": process.env.SIMULATOR_AUTH_URL || "/auth",
    "SIMULATOR_RESULT_URL": process.env.SIMULATOR_RESULT_URL || "/results"

Please pass environemnt variables like -e MONGO_URI=mongodb://mongo:27017/gateway_db
to connect to mongo db .You should run the mongo server on a container and the connect with the image SIMULATOR_PASSWORD and EMAIL as provided.

## Docker Containerization steps:
1. We can execute the command : docker-compose up 
This will create 2 containers one for service and other for mongodb and this will run the service and start storing events in mongodb in database `gateway_db` and collection `horse_racing_events`.
2. In deploy folder we have Dockerfile which has all the commands necessary to run the service.