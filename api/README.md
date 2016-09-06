# flash-api API Development

Before developing, make sure the [database server](../db/README.md) is running.

## Node dependencies installation and usage
Ensure that all of the NPM dependencies have been updated by running the following command
```
npm install
```

To execute the Mocha-based unit tests, run the following command
```
npm test
```

To execute all of the Mocah-based unit tests and see the appropriate Instanbul code coverage metrics, run the following command
```
npm run test-coverage
```

## Scaffolding

The structure of the application is based on the output of express-rest-api generator (https://github.com/trwalker/generator-express-rest-api) with some modifications/enhancements.

You can use the generator to create new controllers, repositories and services and this will create the boilerplate code for the controller, repository or service along with boilerplate code for unit tests and in the case of controllers will add an entry in the route configuration for that controller.

### Scaffolding Controller, Controller Test, and Updates Route Config
`> yo express-rest-api:controller`

### Scaffolding Service and Service Test
`> yo express-rest-api:service`

### Scaffolding Repository and Repository Test
`> yo express-rest-api:repository`

## DockerBot
`bot.sh` helps manage the lifecycle of the docker image

|command|description|
|---|---|
|`build`| builds the image |
|`run`| runs the api server in interactive mode. Use `^C` to exit. |
|`run-bg`| runs the api server in the background. Use `./bot.sh stop` to exit. |
|`push`| pushes the current image to [Dockerhub](https://hub.docker.com/r/stsilabs/) |
|`stop`| stops the api server container |
|`test`| (_not implemented_) tests the api |
|`nuke`| destroy __all__ images and containers |
