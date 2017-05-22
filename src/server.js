// BASE SETUP
// =============================================================================

import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import chalk from 'chalk'

import api from './api'

const production = process.env.NODE_ENV === 'production'


// DEFINE SERVER MANAGER
// -----------------------------------------------------------------------------

const server = {
  // store current setting
  setup: new Map(),
  running: false,

  // change setup
  init (setup) {
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
  start (cb) {
    // Setup express app
    let setup = server.setup
    let app = express()
    // Body parser, to access req.body
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    // Enable logging to stdout
    if (setup.logging) app.use(morgan(setup.logging))
    // Add API routes
    app.use(api)
    // Setup new server instance
    if (server.ssl) {
      let https = require('https')
      app = https.createServer(server.ssl, app)
    }
    // Start the server
    let instance = app.listen(setup.port, setup.host, null, () => {
      server.running = server.ssl ? app : instance
      server.running.on ('close', () => {
        // eslint-disable-next-line no-console
        console.log('Server stopped.')
      })
      // eslint-disable-next-line no-console
      console.log(`Server listening on ${setup.protocol}://${setup.host}:${setup.port}`)
      if (cb) cb()
    })
  },

  // stop server
  stop: () => {
    server.running.close()
    server.running = false
  },

  // restart server
  restart: (cb) => {
    server.stop()
    server.start(cb)
  },
}


// INITIAL SETUP
// -----------------------------------------------------------------------------

server.init({
  protocol: process.env.PROTOCOL || production ? 'https' : 'http',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 1974,
  logging: production ? 'combined' : 'dev'
})

export default server
