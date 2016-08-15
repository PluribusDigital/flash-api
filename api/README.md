# flash-api API Development

Before developing, make sure the [database server](../db/README.md) is running

## DockerBot
`bot.sh` helps manage the lifecycle of the database image

|command|description|
|---|---|
|`build`| builds the image |
|`run`| runs the api server in interactive mode. Use `^C` to exit. |
|`run-bg`| runs the api server in the background. Use `./bot.sh stop` to exit. |
|`push`| pushes the current image to [Dockerhub](https://hub.docker.com/r/stsilabs/) |
|`stop`| stops the api server container |
|`test`| (_not implemented_) tests the api |


