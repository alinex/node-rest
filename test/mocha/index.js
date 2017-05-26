import should from 'should'
import 'should-http'
import request from 'request'

import server from '../../src/server'

// start server before tests
before((cb) => {
  server.init({ logging: null }) // no request logging needed
  server.start()
  .then(cb)
})

// stop server after tests
after(() => {
  server.stop()
})

// run the tests
describe('rest server', () => {

  it('should give name and version number', (cb) => {
    request('http://localhost:1974', (err, res, body) => {
      should.not.exist(err)
      res.should.have.status(200)
      res.should.be.json()
      var data = JSON.parse(body)
      data.should.have.property('message')
      data.message.should.containEql('Alinex REST Server')
      cb()
    })
  })

})
