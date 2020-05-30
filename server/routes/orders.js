var express = require('express');
var router = express.Router();
var connection = require('../db/db');
var $sql = require('../db/sqlMap');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}))

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
  let sql = $sql.order.add
  let params = req.body
  connection.query(sql, [params.user_id, params.shipping_id, params.payment, params.payment_type, params.postage, params.status, params.express], (err, result) => {
    if (err) {
      console.log(err)
    }
    if (result) {
      let sql1 = $sql.order.add_detail
      for (let i in params.product.id) {
        connection.query(sql1, [params.user_id, params.product.id[i] ,params.product.num[i]], (err) => {
          if (err) {
            console.log(err)
          }
        })
      }
      jsonWrite(res, result);
    }
  })
})

router.post('/show', (req, res) => {
  let sql = $sql.order.show
  let params = req.body
  connection.query(sql, [params.id], (err, result) => {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
})

router.post('/del', (req, res) => {
  let sql = $sql.order.del
  let params = req.body
  connection.query(sql, [params.id], (err, result) => {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
})

module.exports = router;
