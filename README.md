# Alinex REST Server

[![GitHub watchers](
  https://img.shields.io/github/watchers/alinex/node-rest.svg?style=social&label=Watch&maxAge=86400)](
  https://github.com/alinex/node-rest/subscription)
[![GitHub stars](
  https://img.shields.io/github/stars/alinex/node-rest.svg?style=social&label=Star&maxAge=86400)](
  https://github.com/alinex/node-rest)
[![GitHub forks](
  https://img.shields.io/github/forks/alinex/node-rest.svg?style=social&label=Fork&maxAge=86400)](
  https://github.com/alinex/node-rest)

[![npm package](
  https://img.shields.io/npm/v/alinex-rest.svg?maxAge=86400&label=latest%20version)](
  https://www.npmjs.com/package/alinex-rest)
[![latest version](
  https://img.shields.io/npm/l/alinex-rest.svg?maxAge=86400)](
  #license)
[![Codacy Badge](
  https://api.codacy.com/project/badge/Grade/d1c36b200a8b47ffb31a1eabd2522d9e)](
  https://www.codacy.com/app/alinex/node-rest/dashboard)
[![Travis status](
  https://img.shields.io/travis/alinex/node-rest.svg?maxAge=86400&label=develop)](
  https://travis-ci.org/alinex/node-rest)
[![Coverage Status](
  https://img.shields.io/coveralls/alinex/node-rest.svg?maxAge=86400)](
  https://coveralls.io/r/alinex/node-rest)
[![Gemnasium status](
  https://img.shields.io/gemnasium/alinex/node-rest.svg?maxAge=86400)](
  https://gemnasium.com/alinex/node-rest)
[![GitHub issues](
  https://img.shields.io/github/issues/alinex/node-rest.svg?maxAge=86400)](
  https://github.com/alinex/node-rest/issues)

__Current State: Basic REST server working - code structure not final.__

The REST Server is part of the [IT Operator](https://github.com/alinex/node-operator)
application and serves as the data source for the front-end applications.


## Installation

For production use the best way is to install through
[IT Operator](https://github.com/alinex/node-operator).


## Usage

The Operator contains both, the Control and REST server, so you may start one or
the other and maybe also both on one server.


## Development

For easy and fast handling use yarn:

``` bash
# Install yarn package manager
$ sudo npm install -g yarn
# Clone from github
$ git clone https://github.com/alinex/node-rest
# Install the modules
$ yarn

# Mongo DB
$ sudo apt install mongodb
```

Now you may run the development version with hot reloading or in the production
version:

``` bash
# Use rest development server
$ yarn test   # run the test suite
$ yarn dev    # run with hot reload

# create and start production server
$ yarn build
$ yarn start
```


## Configuration

The server may be configured using the environment setting. First step is to use
`NODE_ENV=production` (which is done on `yarn start`) changes the whole setting:
- protocol will be HTTPS
- logging will be set to Apache combined format

But you may also set the following entries separately through environment settings:
- `PROTOCOL` - should be `http` or `https`
- `HOST` - hostname on which to listen to, use '0.0.0.0' for all IPs
- `PORT` - port to listen on (defaults to 1974)


## Module Use

This server may also be used as module in another project. Therefore you should import
and initialize it using:

``` javascript
import restInit from 'alinex-rest/dist/init'
import RestServer from 'alinex-rest/dist/server'

RestServer.init({ ... }) // configure server
RestServer.start()
.then(doSomething)
```


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
