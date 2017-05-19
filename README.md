# Alinex REST Server

[![GitHub watchers](
  https://img.shields.io/github/watchers/alinex/node-rest.svg?style=social&label=Watch&maxAge=86400)](
  https://github.com/alinex/node-rest/subscription)<!-- {.hidden-small} -->
[![GitHub stars](
  https://img.shields.io/github/stars/alinex/node-rest.svg?style=social&label=Star&maxAge=86400)](
  https://github.com/alinex/node-rest)
[![GitHub forks](
  https://img.shields.io/github/forks/alinex/node-rest.svg?style=social&label=Fork&maxAge=86400)](
  https://github.com/alinex/node-rest)<!-- {.hidden-small} -->
<!-- {p:.right} -->

[![npm package](
  https://img.shields.io/npm/v/alinex-rest.svg?maxAge=86400&label=latest%20version)](
  https://www.npmjs.com/package/alinex-rest)
[![latest version](
  https://img.shields.io/npm/l/alinex-rest.svg?maxAge=86400)](
  #license)<!-- {.hidden-small} -->
[![Travis status](
  https://img.shields.io/travis/alinex/node-rest.svg?maxAge=86400&label=develop)](
  https://travis-ci.org/alinex/node-rest)
[![Gemnasium status](
  https://img.shields.io/gemnasium/alinex/node-rest.svg?maxAge=86400)](
  https://gemnasium.com/alinex/node-rest)
[![GitHub issues](
  https://img.shields.io/github/issues/alinex/node-rest.svg?maxAge=86400)](
  https://github.com/alinex/node-rest/issues)<!-- {.hidden-small} -->

The REST Server is part of the [IT Operator](https://github.com/alinex/node-operator)
application and serves as the data source for the front-end applications.

## Technologies

- Server [ExpressJS](http://expressjs.com/)
- Logging with [morgan](https://github.com/expressjs/morgan)
- Database [MongoDB](https://www.mongodb.com) with [mongoose](http://mongoosejs.com/) driver
- Development using [nodemon](https://github.com/remy/nodemon),
  [babel](https://babeljs.io/), [eslint](http://eslint.org/), [mocha](https://mochajs.org/)

## Usage

**In the moment this is in heavy development and not really ready for productive use.**

The Operator contains both, the Control and REST server, so you may start one or
the other and maybe also both on one server.

### Installation

For easy and fast handling use yarn:

``` bash
# Install yarn package manager
$ sudo npm install -g yarn
# Install the operator
$ yarn global add https://github.com/alinex/node-operator

# Mongo DB
$ sudo apt install mongodb
```

Now you may start it:
``` bash
$ yarn control  # Start control server
$ yarn rest     # Start rest server
$ yarn start    # Start both servers
```

### Development

For development you should clone from github and install:

``` bash
# Install yarn package manager
$ git clone https://github.com/alinex/node-operator
# Install the modules
$ yarn
```

Now you may run the development version with hot reloading:

``` bash
# Start both server
$ yarn dev
```

You may also run each of them individually in their modules.


## Page Structure

__Basic Pages__

    /           System Start
    /login      Login Page

## REST API

In the following paragraphs some of the API calls are described with:
- Http Method
- URI
- Query Parameter (starting with '?')
- Post Parameter
- Group allowed (starting with '@')

In general `GET` and `HEAD` are always the same but without values in `HEAD`.

__General Scheme__

    HEAD    /api/<group>/<object>/<access>  // check for existence
    GET     /api/<group>/<object>/<access>  // get object(s)/<value>
    POST    /api/<group>/<object>/<access>  // change object(s)
    PUT     /api/<group>/<object>/<access>  // add/replace object(s)
    DELETE  /api/<group>/<object>/<access>  // delete object(s)


Search for objects:

    HEAD    /api/db/person/search/name/Hund
    GET     /api/db/person/search/name/Hund
    GET     /api/db/person/search
            ?status_type_id=999009&name=%Hund%

Accessing an individual object:

    HEAD    /api/db/person/id/12345678
    GET     /api/db/person/id/12345678

Change object (changes in POST-DATA):

    POST    /api/db/person/id/12345678
            status_type_id=999020
    POST    /api/db/person/search/name/Hund
            status_type_id=999020
    POST    /api/db/person/search
            ?status_type_id=999009&name=%Hund%
            status_type_id=999020

Insert/replace/remove the object completely:

    PUT     /api/db/person
            name=..., ...
    PUT     /api/db/person/id/12345678
            name=..., ...
    DELETE  /api/db/person/id/12345678

__Response__

The response will always be json:

    # identification
    date: <Date>
    uri: <String>
    statusCode: <Integer>
    message: <String>

If the response contains some data it will also have:

    # meta information
    meta:
      title: <String>
      description: <String>
      data: HashMap cols<Object>
    # content data
    data: Array<Object rows>

### Access Management

The rights are based on the groups in which an user is member of. It is persisted
within a json file on disk.

__Authentication__

    POST    /api/access/auth/login
            user=<string>, password=<string>
    POST    /api/access/auth/logout

__User Management__

    GET     /api/access/user                   @admin
            ?email=<string>
    GET     /api/access/user/<string>                         // nopasswd
    PUT     /api/access/user/<string>                         // register
            password=<string>, email=<string>
    POST    /api/access/user/<string>          @self, @admin
            password=<string>, email=<string>
    DELETE  /api/access/user/<string>          @self, @admin

__Groups__

    GET     /api/access/group                                 // rights  
            ?user=<string>
    GET     /api/access/group/<string>                        // users          
    PUT     /api/access/group/<string>         @admin         // new group
    DELETE  /api/access/group/<string>         @admin         // remove group
    PUT     /api/access/group/<string>/member/<string>  @admin
    DELETE  /api/access/group/<string>/member/<string>  @admin


## License

(C) Copyright 2017 Alexander Schilling

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

>  <https://www.apache.org/licenses/LICENSE-2.0>

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
