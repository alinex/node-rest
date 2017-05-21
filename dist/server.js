'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 1974;
var production = process.env.NODE_ENV === 'production';

var app = (0, _express2.default)();
app.set('port', port);

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.use((0, _morgan2.default)(production ? 'combined' : 'tiny'));

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test');
app.use(_api2.default);

var server = app;
var protocol = 'http';
if (production) {
  var https = require('https');
  var fs = require('fs');
  var options = {
    key: fs.readFileSync('config/ssl/private.key'),
    cert: fs.readFileSync('config/ssl/certificate.pem')
  };
  server = https.createServer(options, app);
  protocol = 'https';
}

server.listen(port, host, null, function () {
  console.log('Server listening on ' + protocol + '://' + host + ':' + port);
});