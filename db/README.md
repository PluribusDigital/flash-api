# flash-api Database Development

## DockerBot
`bot.sh` helps manage the lifecycle of the database image

|command|description|
|---|---|
|`build`| rebuilds the database|
|`cycle`| stops, destroys, rebuilds and runs the database. |
|`run`| runs the database server in interactive mode. Use `^C` to exit. |
|`run-bg`| runs the database server in the background. Use `./bot.sh stop` to exit. |
|`push`| pushes the current image to [Dockerhub](https://hub.docker.com/r/stsilabs/) |
|`stop`| stops the database server container |
|`test`| (_not implemented_) tests the database |
|`nuke`| destroy __all__ images and containers |

During `vagrant up`, the database server is "started" by running `./bot.sh run-bg`

## Updating the database

For more information on the DB Migration scheme used for this project, check this out -> [db-migrate documentation](https://db-migrate.readthedocs.io/en/latest/Getting%20Started/usage/)

1. `cd ../api` (assuming you are starting in the `./db` directory)
1. Create a new migration using the following command: `./node_modules/db-migrate/bin/db-migrate create <name>`
1. Modify the migration script with your favorite editor at `./migrations/sqls/<date>-<name>-up.sql`
1. Modify the migration rollback script with your favorite editor at `./migrations/sqls/<date>-<name>-down.sql`
1. (_rarely_) Modify the Javascript file with your favorite editor at `./migrations/<date>-<name>.js`
1. Execute the migrations using the following command: `./node_modules/db-migrate/bin/db-migrate up`
