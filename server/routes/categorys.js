var express = require('express');
var router = express.Router();
var connection = require('../db/db');
var $sql = require('../db/sqlMap');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}))

/* GET home page. */
router.get('/', function(req, res, next) {
  var sql = $sql.category.name;
  connection.query(sql, ((error, results, fields) => {
    const category = {}
    for (const i in results) {
      category[results[i].id] = results[i].name
    }
    res.json(category)
  }))
});

module.exports = router;
