import should from 'should'
import shouldHttp from 'should-http'
import request from 'request'

import server from '../../src/server'

// eslint-env node, mocha

before((cb) => {
  server.init({ logging: null }) // no request logging needed
  server.start()
  .then(cb)
})

after(() => {
  server.stop()
})

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
