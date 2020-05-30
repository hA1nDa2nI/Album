var express = require('express')
var router = express.Router()
var connection = require('../db/db')
var $sql = require('../db/sqlMap')
var fs = require("fs")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
})

router.get('/usershow', (req, res, next) => {
  var sql = $sql.admin.usershow
  connection.query(sql, ((error, results, fields) => {
    res.json(results)
  }))
})

router.get('/order', (req, res, next) => {
  var sql = $sql.admin.order
  connection.query(sql, ((error, results, fields) => {
    res.json(results)
  }))
})

router.get('/category', (req, res, next) => {
  var sql = $sql.admin.category
  connection.query(sql, ((error, results, fields) => {
    res.json(results)
  }))
})

router.get('/categorypro', (req, res, next) => {
  var sql = $sql.admin.categorypro
  connection.query(sql, ((error, results, fields) => {
    res.json(results)
  }))
})

router.get('/banner', (req, res, next) => {
  var sql = $sql.admin.banner
  connection.query(sql, ((error, results, fields) => {
    res.json(results)
  }))
})

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

router.post('/login', (req, res) => {
  let sql = $sql.admin.login;    
  let params = req.body;
  connection.query(sql, [params.no], (err, result) => {    
    if (err) {       
      console.log(err);
    }        
    if (result) {
      if (result[0].count == 0) {
        result = "用户名错误!"
      } else if (result[0].count == 1 && result[0].password == params.password) {
        result = [1]
      } else {
        result = "密码错误!"
      }
      jsonWrite(res, result);
      res.end('is over');
    }
  })
})

router.post('/deluser', (req, res) => {
  let sql = $sql.admin.deluser;    
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

router.post('/adduser', (req, res) => {
  let sql = $sql.admin.adduser
  let params = req.body.user
  if (!params.img) {
    params.img = 'https:misc.360buyimg.com/user/myjd-2015/css/i/peisong.jpg'
    connection.query(sql, [params.name, params.pwd, params.email, params.phone, params.img], (err, result) => {
      if (err) {       
        console.log(err)
      }
      if (result) {
        jsonWrite(res, result)
        res.end('is over')
      }
    })
  } else {
    let base64Data = params.img.replace(/^data:image\/\w+;base64,/, "")
    let dataBuffer = new Buffer.from(base64Data, 'base64')
    let filename = 'user' + Date.now() + '.jpg'
    fs.writeFile("../src/assets/images/user/" + filename, dataBuffer, function(err) {
      if(err) {
        console.log(err)
        res.send(err)
      } else {
        connection.query(sql, [params.name, params.pwd, params.email, params.phone, filename], (err, result) => {
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
  }
})

router.post('/addcategory', (req, res) => {
  let sql = $sql.admin.addcategory
  let params = req.body
  connection.query(sql, [params.name], (err, result) => {
    if (err) {       
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
      res.end('is over');
    }
  })
})

router.post('/delcategory', (req, res) => {
  let sql = $sql.admin.delcategory
  let params = req.body
  connection.query(sql, [params.status, params.id], (err, result) => {
    if (err) {       
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
      res.end('is over');
    }
  })
})

router.post('/product', (req, res) => {
  let sql = $sql.admin.product
  let params = req.body
  connection.query(sql, [params.category], (err, result) => {
    if (err) {       
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
      res.end('is over');
    }
  })
})

router.post('/productsearch', (req, res) => {
  let sql = ''
  let params = req.body.product
  if (params.id && params.name) {
    sql = 'SELECT *, date_format(create_time, "%Y-%m-%d %H:%i:%S") AS time FROM record_product WHERE id like "%' + params.id + '%" OR title like "%' + params.name + '%";' 
  } else if (params.id && !params.name) {
    sql = 'SELECT *, date_format(create_time, "%Y-%m-%d %H:%i:%S") AS time FROM record_product WHERE id like "%' + params.id + '%";'
  } else {
    sql = 'SELECT *, date_format(create_time, "%Y-%m-%d %H:%i:%S") AS time FROM record_product WHERE title like "%' + params.name + '%";'
  }
  connection.query(sql,[], (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
      res.end('is over');
    }
  })
})

router.post('/productupdate', (req, res) => {
  let sql = $sql.admin.productupdate
  let params = req.body.updatepro
  if (params.img[0]=='h' || params.img[0]=='p') {
    connection.query(sql, [params.title, params.author, params.price, params.maprice, params.validity, params.catalog, params.detail, params.tags, params.artist_intro, params.editor_recom, params.img, params.id], (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result) {
        jsonWrite(res, result);
        res.end('is over');
      }
    })
  } else {
    let base64Data = params.img.replace(/^data:image\/\w+;base64,/, "")
    let dataBuffer = new Buffer.from(base64Data, 'base64')
    let filename = 'product' + Date.now() + '.jpg'
    fs.writeFile("../src/assets/images/product/" + filename, dataBuffer, function(err) {
      if(err) {
        console.log(err)
        res.send(err)
      } else {
        connection.query(sql, [params.title, params.author, params.price, params.maprice, params.validity, params.catalog, params.detail, params.tags, params.artist_intro, params.editor_recom, filename, params.id], (err, result) => {
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
  }
})

router.post('/productadd', (req, res) => {
  let sql = $sql.admin.productadd
  let params = req.body.addpro
  let base64Data = params.img.replace(/^data:image\/\w+;base64,/, "")
    let dataBuffer = new Buffer.from(base64Data, 'base64')
    let filename = 'product' + Date.now() + '.jpg'
    fs.writeFile("../src/assets/images/product/" + filename, dataBuffer, function(err) {
      if(err) {
        console.log(err)
        res.send(err)
      } else {
        connection.query(sql, [params.category, params.author, params.title, filename, params.detail, params.price, params.maprice, params.catalog, params.validity, params.artist_intro, params.editor_recom, params.categoryid], (err, result) => {
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
  
})

router.post('/productdel', (req, res) => {
  let sql = $sql.admin.productdel
  let params = req.body
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

router.post('/comment', (req, res) => {
  let sql = ''
  let params = req.body
  if (params.product && params.user) {
    sql = $sql.admin.comment
    connection.query(sql, [params.product, params.user], (err, result) => {
      if (err) {       
        console.log(err);
      }
      if (result) {
        jsonWrite(res, result);
        res.end('is over');
      }
    })
  } else if (!params.product && params.user) {
    sql = $sql.admin.commentuser
    connection.query(sql, [params.user], (err, result) => {
      if (err) {       
        console.log(err);
      }
      if (result) {
        jsonWrite(res, result);
        res.end('is over');
      }
    })
  } else {
    sql = $sql.admin.commentproduct
    connection.query(sql, [params.product], (err, result) => {
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

router.post('/commentdel', (req, res) => {
  let sql = $sql.admin.commentdel
  let params = req.body
  connection.query(sql, [params.id, params.product], (err, result) => {
    if (err) {       
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
      res.end('is over');
    }
  })
})

router.post('/bannerdel', (req, res) => {
  let sql = $sql.admin.bannerdel
  let params = req.body
  connection.query(sql, [params.state, params.id], (err, result) => {
    if (err) {       
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
      res.end('is over');
    }
  })
})

router.post('/banneradd', (req, res) => {
  let sql = $sql.admin.banneradd;
  let params = req.body;
  let base64Data = params.img.replace(/^data:image\/\w+;base64,/, "")
  let dataBuffer = new Buffer.from(base64Data, 'base64')
  let filename = 'banner' + Date.now() + '.jpg'
  fs.writeFile("../src/assets/images/banner/" + filename, dataBuffer, function(err) {
    if(err) {
      console.log(err)
      res.send(err)
    } else {
      connection.query(sql, [filename, params.status], (err, result) => {
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

router.post('/orderupdate', (req, res) => {
  let sql = $sql.admin.orderupdate;
  let params = req.body;
  connection.query(sql, [params.status, params.order, params.product], (err, result) => {
    if (err) {       
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
      res.end('is over')
    }
  })
})

module.exports = router;