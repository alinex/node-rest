// BASE SETUP
// =============================================================================

import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import api from './api'

// Configuration
const protocol = process.env.PROTOCOL || process.env.NODE_ENV === 'production' ? 'https' : 'http'
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 1974
const production = process.env.NODE_ENV === 'production'

// Setup express app
const app = express()
app.set('port', port)

// Body parser, to access req.body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Enable logging to stdout
app.use(morgan(production ? 'combined' : 'tiny'))

// Add API routes
app.use(api)

// Setup server
var server = app // default http
if (protocol === 'https') {
  // Setup HTTPS
  var https = require('https')
  var fs = require('fs')
  var options = {
    key: fs.readFileSync('config/ssl/private.key'),
    cert: fs.readFileSync('config/ssl/certificate.pem')
  }
  server = https.createServer(options, app)
}

// Start server
server.listen(port, host, null, () => {
  console.log('Server listening on ' + protocol + '://' + host + ':' + port) // eslint-disable-line no-console
})
