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
  let sql = $sql.cart.select;
  let params = req.body;
  connection.query(sql, [params.user_id, params.product_id], (err, result) => {
    if (err) {       
      console.log(err);
    }
    if (result) {
      if (result[0].count) {
        result = '该商品已在购物车，请勿重复添加!'
        jsonWrite(res, result);
        res.end('is over');
      } else {
        let sql1 = $sql.cart.add;
        connection.query(sql1, [params.user_id, params.product_id, params.quantity], (err, result) => {
          if (err) {       
            console.log(err);
          }
          if (result) {
            result = '成功加入购物车！'
            jsonWrite(res, result);
            res.end('is over');
          }
        })
      }
    }
  })
});

router.post('/show', (req, res) => {
  let sql = $sql.cart.show;
  let params = req.body;
  connection.query(sql, [params.user_id], (err, result) => {
    if (err) {       
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
      res.end('is over');
    }
  })
});

router.post('/update', (req, res) => {
  let sql = $sql.cart.update;
  let params = req.body;
  connection.query(sql, [params.num, params.id], (err, result) => {
    if (err) {       
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
      res.end('is over');
    }
  })
});

router.post('/del', (req, res) => {
  let sql = $sql.cart.del;
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

router.post('/submit', (req, res) => {
  let sql = $sql.cart.del
  let params = req.body
  for (let i in params.ids) {
    connection.query(sql, [params.ids[i]], (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      }
    })
  }
  jsonWrite(res, 1);
  res.end('is over');
})

module.exports = router;
