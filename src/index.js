import mongoose from 'mongoose'

import server from './server'

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/alinex') // connect to our database

// start the server
server.start(() => {
  // maybe do something here
})
