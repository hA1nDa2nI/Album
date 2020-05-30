var express = require('express');
var router = express.Router();
var connection = require('../db/db')
var $sql = require('../db/sqlMap')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
})

module.exports = router;
