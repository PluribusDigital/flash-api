# flash-api
DHS Flash Technical Challenge

## Prerequisites
+ [Oracle VirtualBox](https://www.virtualbox.org/wiki/Downloads)
+ [Vagrant](https://www.vagrantup.com/downloads.html)
* [(optional) Update VirtualBox Guest Additions](https://github.com/dotless-de/vagrant-vbguest)
  * `vagrant plugin install vagrant-vbguest`

## Installation
##### Establish local secrets
```shell
cp .env.example .env
```

Use your favorite editor to update the values in `.env`

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
guest> cd api && ./bot.sh run
```
* The Sample endpoint should be available at `http://192.168.50.10:8080/api/item/`

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
