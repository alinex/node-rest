import mongoose from 'mongoose'

import RestServer from './server'

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/alinex') // connect to our database

// start the server
RestServer.start().then(
  // do anything
)
