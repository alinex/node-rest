import should from 'should'
import shouldHttp from 'should-http'
import request from 'request'

// eslint-env node, mocha

before(function() {
  require('../../lib/server').default()
})

describe('rest server', function() {
  it('should give name and version number', function(cb) {
    request('http://localhost:1974', function(err, res, body) {
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
