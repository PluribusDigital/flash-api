# flash-api
[![Build Status](https://travis-ci.com/STSILABS/flash-api.svg?token=s8fjYespqEg1vvrpYmqn&branch=develop)](https://travis-ci.com/STSILABS/flash-api)
[![Code Climate](https://codeclimate.com/repos/57c7583910729e4fe2000668/badges/7a7a81592fe216a1ddc7/gpa.svg)](https://codeclimate.com/repos/57c7583910729e4fe2000668/feed)
[![Test Coverage](https://codeclimate.com/repos/57c7583910729e4fe2000668/badges/7a7a81592fe216a1ddc7/coverage.svg)](https://codeclimate.com/repos/57c7583910729e4fe2000668/coverage)

DHS Flash Technical Challenge

## Prerequisites
+ [Oracle VirtualBox](https://www.virtualbox.org/wiki/Downloads)
+ [Vagrant](https://www.vagrantup.com/downloads.html)
* [(optional) Update VirtualBox Guest Additions](https://github.com/dotless-de/vagrant-vbguest)
  * `vagrant plugin install vagrant-vbguest`

## Installation
Prior to running any of the commands below, please ensure that you start in the root directory of the cloned repository.
##### Establish local secrets
```shell
cp .env.example .env
cp ./api/app/config/db-config.js.example ./api/app/config/db-config.js
cp ./api/app/config/api-config.js.example ./api/app/config/api-config.js
```

Use your favorite editor to update the values in `.env`, `db-config.js`, and `api-config.js`.  In `db-config.js`, ensure that proper database username and password are updated.  In `api-config.js`, ensure that the proper API keys are added to the `valid_keys` array.

##### Build the box
```shell
vagrant up
```

##### Verify Installation (DB)
* The PostgreSQL database should be available at `192.168.50.10:5432`

##### Verify Installation (API)
```shell
# Start the http server
host> vagrant ssh
# password is 'vagrant'
guest> api/bot.sh run
```
* Validate that API's are up and running by making a `GET` request to `http://192.168.50.10:8080/v1/users`.  This should produce an error if no credentials are being passed with the request.  Example error below:

```json
{
  "error": "You must provide an API Key and Authorization before accessing our service."
}
```

To properly authenticate with the APIs, there are 2 credentials that must be sent with every API request.
* API Key MUST be present as a URL query parameter `api_key` (This must match one of the `valid_keys` from the `api-config.js`)
 * Ex: `http://192.168.50.10:8080/v1/users?api_key=<INSERT_API_KEY_HERE>`
* `Authorization` header must be present with Basic Authorization token consisting of a `base64` encoded `username:password`
 * Ex: `Authorization: Basic <BASE64_ENCODED_VALUE_HERE>`
 * The Seed data for this application by default are the US Presidents.  The username for each president is generally the first initial followed by the last name (i.e. `gwashington`) and the password is preset to the president's first name followed by the president's sequence number (i.e. `george1` for George Washington and `barack44` for Barack Obama)
 * A full list of usernames can be found in the user seed data migration located in `./api/migrations/sqls/20160831224133-seed-users-up.js`

##### Stopping the HTTP Server (API)

```shell
# Stop the http server
guest> ^C
guest> exit
host>
```

## Development
There are two areas being developed in this repository.  The development guidance for each is located in the root of the subdirectory.

* [Database](db/README.md)
* [API](api/README.md)

## Database
For access directly to the PostgreSQL database served from the DB Docker container and Vagrant VM, use your favorite/local PG administrative tool.  Here are the example connection settings (as captured from PGAdmin) that could be extrapolated and used with any tool.

![PG Admin Configuration](/docs/pgAdminConfig.png?raw=true "PGAdmin Configuration")
