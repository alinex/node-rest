import { Router } from 'express'

import Bear from '../models/bear'

const router = Router()

// middleware to use for all requests
router.use((req, res, next) => {
  // do logging
  console.log('Something is happening.') // eslint-disable-line no-console
  next() // make sure we go to the next routes and don't stop here
})

// more routes for our API will happen here

// on routes that end in /bears
// ----------------------------------------------------
// create a bear (accessed at POST http://localhost:8080/api/bears)
router.post('/', (req, res) => {
  const bear = new Bear()      // create a new instance of the Bear model
  bear.name = req.body.name  // set the bears name (comes from the request)

  // save the bear and check for errors
  bear.save((err) => {
    if (err) {
      res.send(err)
    }
    res.json({ message: 'Bear created!' })
  })
})

// get all the bears (accessed at GET http://localhost:8080/api/bears)
router.get('/', (req, res) => {
  Bear.find((err, bears) => { // eslint-disable-line array-callback-return
    if (err) {
      res.send(err)
    }
    res.json(bears)
  })
})

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route(':bear_id')

  // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
  .get((req, res) => {
    Bear.findById(req.params.bear_id, (err, bear) => {
      if (err) res.send(err)
      res.json(bear)
    })
  })

  // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
  .put((req, res) => {
    // use our bear model to find the bear we want
    /* eslint no-param-reassign:
      ["error", { "props": true, "ignorePropertyModificationsFor": ["bear"] }] */
    Bear.findById(req.params.bear_id, (err, bear) => {
      if (err) {
        res.send(err)
      }
      bear.name = req.body.name  // update the bears info
      // save the bear
      bear.save((err) => {
        if (err) {
          res.send(err)
        }
        res.json({ message: 'Bear updated!' })
      })
    })
  })

  // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
  .delete((req, res) => {
    Bear.remove({
      _id: req.params.bear_id,
    }, (err) => {
      if (err) {
        res.send(err)
      }
      res.json({ message: 'Successfully deleted' })
    })
  })

export default router
