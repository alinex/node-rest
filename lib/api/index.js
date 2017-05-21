import { Router } from 'express'
import util from 'util'

import bear from './bear'

const router = Router()

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our bear api!' })
})

// Add Routes
router.use('/bears', bear)
//router.use('/access', access)

router.use(function (err, req, res, next) { // eslint-disable-line no-unused-vars
  /* We log the error internaly */
  console.error('ERROR: ' + util.inspect(err).replace(/\s+/, ' ')) // eslint-disable-line no-console

  var data = { statusCode: err.statusCode || 500, message: err.message || 'Internal Error' }

  // add stack in development mode
  if (req.app.get('env') === 'development') {
    data.stack = err.stack
  }

  /* Finaly respond to the request */
  res.status(data.statusCode).json(data)
})

export default router
