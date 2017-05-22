import { Router } from 'express'
import util from 'util'

import bear from './bear'

const router = Router()

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: `Alinex REST Server V ${process.env.npm_package_version}` })
})

// Add Routes
router.use('/bears', bear)
//router.use('/access', access)

router.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  /* We log the error internaly */
  console.error('ERROR: ' + util.inspect(err).replace(/\s+/, ' ')) // eslint-disable-line no-console

  let data = { statusCode: err.statusCode || 500, message: err.message || 'Internal Error' }

  // add stack in development mode
  if (req.app.get('env') === 'development') {
    data.stack = err.stack
  }

  /* Finaly respond to the request */
  res.status(data.statusCode).json(data)
})

export default router
