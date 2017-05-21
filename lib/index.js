import mongoose from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/alinex') // connect to our database

// start the server
require('./server')
