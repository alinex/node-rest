// @flow

// BASE SETUP
// =============================================================================

import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import chalk from 'chalk'

import api from './api'

const production = process.env.NODE_ENV === 'production'

type Setup = {
  port: number,
  ssl: boolean
}

class Server {
  setup: Setup
  handler: Object

  constructor(setup: Setup) {
    this.setup = setup
    console.log('xxx')
  }

  start(): Promise<void> {
    const app: Object = express()
    this.handler = app
    return Promise.resolve()
  }
}


export default Server

// INITIALIZE ENVIRONMENT
// -----------------------------------------------------------------------------


// DEFINE SERVER MANAGER
// -----------------------------------------------------------------------------

const server: {
  setup: Object,
  instance?: Object,
  init: Function,
  start: Function,
  stop: Function
} = {
  // store current setting
  setup: new Map(),

  // change setup
  init: (setup: Object) => {
    if (server.setup.size) {
      // eslint-disable-next-line no-console
      console.log(chalk.grey('Server configuration will be changed...'))
    }
    Object.assign(server.setup, setup)
    if (server.running) {
      // eslint-disable-next-line no-console
      console.warn('Server should be restarted for changes to take effect!')
    }
  },

  // start server
  start: () => new Promise((cb) => {
    // Setup express app
    const setup = server.setup
    let app: Object = express()
    // Body parser, to access req.body
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    // Enable logging to stdout
    if (setup.logging) app.use((morgan: any)(setup.logging))
    // Add API routes
    app.use(api)
    // Setup new server instance
    if (setup.ssl) {
      const https = require('https') // eslint-disable-line global-require
      app = https.createServer(setup.ssl, app)
    }
    // Start the server
    const instance = app.listen(setup.port, setup.host, null, () => {
      server.instance = setup.ssl ? app : instance
      server.instance.on('close', () => {
        // eslint-disable-next-line no-console
        console.log('Server stopped.')
      })
      // eslint-disable-next-line no-console
      console.log(`Server listening on ${setup.protocol}://${setup.host}:${setup.port}`)
      cb()
    })
  }),

  // stop server
  stop: () => {
    if (server.instance) server.instance.close()
    delete server.instance
  },

  // restart server
  restart: (): Promise<any> => new Promise((cb) => {
    server.stop()
    server.start().then(cb)
  }),
}


// INITIAL SETUP
// -----------------------------------------------------------------------------

server.init({
  protocol: process.env.PROTOCOL || production ? 'https' : 'http',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 1974,
  logging: production ? 'combined' : 'dev',
})
