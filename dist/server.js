'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

var port = process.env.PORT || 1974;
var router = _express2.default.Router();
router.get('/', function (req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhosst:27017/test'); // connect to our database

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
