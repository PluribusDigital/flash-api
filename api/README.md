# flash-api API Development

Before developing, make sure the [database server](../db/README.md) is running

## Node dependencies installation

Run `npm run-script install-local` to install all node dependencies to run unit tests and generate controller, repository and service scaffolding.

## Scaffolding

The structure of the application is based on the output of express-rest-api generator (https://github.com/trwalker/generator-express-rest-api) with some modifications.

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

## API Application configuration

There are a few areas of the API Application that require configuration and customization based on the setup of the environment that is being deployed to.

### PostgreSQL DB configuration

To configure the database connection values, run the following commands (These commands are specific to Mac/Linux systems... For Windows systems, use appropriate Windows equivalents):

```
cd ./config
cp ./db-config.js.example ./db-config.js
vi ./db-config.js
```

Ensure that the proper database username and password are updated

### API configuration

To configure the api security values, run the following commands (These commands are specific to Mac/Linux systems... For Windows systems, use appropriate Windows equivalents):

```
cd ./config
cp ./api-config.js.example ./api-config.js
vi ./api-config.js
```

Ensure that the proper API keys are added to the `valid_keys` array
