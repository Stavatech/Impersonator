var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('In future, this endpoint will run commands');
});

router.get('/ping', function(req, res, next) {
  res.send('This is an Impersonator service');
});

module.exports = router;
