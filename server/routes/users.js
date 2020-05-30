var express = require('express')
var router = express.Router()
var connection = require('../db/db')
var $sql = require('../db/sqlMap')
var bodyParser = require('body-parser')
var fs = require("fs")

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

router.post('/register', (req, res) => {
  let sql = $sql.user.register;
  let params = req.body;
  connection.query(sql, [params.phone, params.password], (err, result) => {
    if (err) {       
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
      res.end('is over');
    }
  })
});

router.post('/login', (req, res) => {
  let sql = $sql.user.login;    
  let params = req.body;
  connection.query(sql, [params.phone], (err, result) => {    
    if (err) {       
      console.log(err);
    }        
    if (result) {
      if (result[0].count == 0) {
        result = "该手机号未注册!"
      } else if (result[0].count == 1 && result[0].password == params.password) {
        result = [1,result[0].id]
      } else {
        result = "密码错误!"
      }
      jsonWrite(res, result);
      res.end('is over');
    }
  })
});

router.post('/repasswd', (req, res) => {
  let sql = $sql.user.login;  
  let params = req.body;
  connection.query(sql, [params.phone], (err, result) => {    
    if (err) {       
      console.log(err);
    }        
    if (result) {
      if (result[0].count == 0) {
        result = "该手机号未注册!"
      } else {
        let sql = $sql.user.repasswd;
        connection.query(sql, [params.password, params.phone], (err, result) => {    
          if (err) {       
            console.log(err);
          }
          if (result) {
            result = "修改成功!"
          }
        })
      }
      jsonWrite(res, result);
      res.end('is over');
    }
  })  
});

router.post('/profile', (req, res) => {
  let sql = $sql.user.profile;
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

router.post('/update', (req, res) => {
  let sql = $sql.user.update;
  let params = req.body;
  let base64Data = params.img.replace(/^data:image\/\w+;base64,/, "")
  let dataBuffer = new Buffer.from(base64Data, 'base64')
  let filename = 'user'+ params.id + Date.now() + '.jpg'
  fs.writeFile("../src/assets/images/user/" + filename, dataBuffer, function(err) {
    if(err) {
      console.log(err)
      res.send(err)
    } else {
      connection.query(sql, [params.name, params.email, filename, params.id], (err, result) => {
        if (err) {       
          console.log(err)
        }
        if (result) {
          jsonWrite(res, result)
          res.end('is over')
        }
      })
    }
  })
})

module.exports = router;
