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
copy .env.example .env
```

Use your favorite editor to update the values in `.env`

##### Build the box
```shell
vagrant up
```
##### Verify Installation
* The PostgreSQL database should be available at `192.168.50.10:5432`

## Development
_TBD_
