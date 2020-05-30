var express = require('express');
var router = express.Router();
var connection = require('../db/db');
var $sql = require('../db/sqlMap');
var bodyParser = require('body-parser');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var jsonWrite = (res, ret) => {
  if(typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
}

router.post('/show', (req, res) => {
  let sql = $sql.comment.show;
  let params = req.body;
  connection.query(sql, [params.id], (err, result) => {
    if (err) {       
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
      res.end('is over');
    }
  })
})

router.post('/add', (req, res) => {
  let sql = $sql.comment.add;
  let params = req.body;
  connection.query(sql, [params.userid, params.productid, params.content, params.star, params.userid], (err, result) => {
    if (err) {       
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
      res.end('is over');
    }
  })
})

module.exports = router;
