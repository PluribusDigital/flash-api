# flash-api Database Development

## DockerBot
`bot.sh` helps manage the lifecycle of the database image

|command|description|
|---|---|
|`build`| rebuilds the database|
|`run`| runs the database server in interactive mode. Use `^C` to exit. |
|`run-bg`| runs the database server in the background. Use `./bot.sh stop` to exit. |
|`push`| pushes the current image to [Dockerhub](https://hub.docker.com/r/stsilabs/) |
|`stop`| stops the database server container |
|`test`| (_not implemented_) tests the database |

During `vagrant up`, the database server is "started" by running `./bot.sh run-bg`

## Creating Tables

1. Stop the database `./bot.sh stop`
1. Update `schema.sql` with new tables, views or stored procedures
1. Build the database `./bot.sh build`
1. Start the server `./bot.sh run` or `./bot.sh run-bg`

## Seeding the database

1. Stop the database `./bot.sh stop`
1. Update `seed.sql` with insert or COPY statements
1. Build the database `./bot.sh build`
1. Start the server `./bot.sh run` or `./bot.sh run-bg`


__Note__: The build step is only required when destroying and recreating the database.  It is not needed to run the server
