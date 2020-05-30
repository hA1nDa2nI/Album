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

router.post('/add', (req, res) => {
  let sql = $sql.address.add;
  let params = req.body;
  connection.query(sql, [params.id, params.name, params.tel, params.province, params.city, params.district, params.address], (err, result) => {
    if (err) {       
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
      res.end('is over');
    }
  })
});

router.post('/show', (req, res) => {
  let sql = $sql.address.show;
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
});

router.post('/default', (req, res) => {
  let sql = $sql.address.state
  let params = req.body
  connection.query(sql, [params.user_id], (err, result) => {
    if (err) {       
      console.log(err);
    }
    if (result) {
      let sql = $sql.address.default
      connection.query(sql, [params.id], (err, result) => {
        if (err) {       
          console.log(err);
        }
        if (result) {
          jsonWrite(res, result);
          res.end('is over');
        }
      })
    }
  })
});

router.post('/del', (req, res) => {
  let sql = $sql.address.del;
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
});

module.exports = router;
