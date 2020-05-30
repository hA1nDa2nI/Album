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
router.get('/', (req, res, next) => {
  var sql = $sql.product.index;
  connection.query(sql, ((error, results, fields) => {
    const product = {}
    for (const i in results) {
      const obj = {
        'id': results[i].id,
        'title': results[i].title, 
        'bigimage': results[i].main_image, 
        'price': results[i].price
      }
      if (results[i].name in product) {
        product[results[i].name].push(obj)
      } else {
        product[results[i].name] = [obj]
      }
    }
    res.json(product)
  }))
});

// 评论top4
router.get('/commenttop', (req, res, next) => {
  var sql = $sql.product.commentTop;
  connection.query(sql, ((error, results, fields) => {
    res.json(results)
  }))
});
// 新碟资讯
router.get('/updatetime', (req, res, next) => {
  var sql = $sql.product.updatetime;
  connection.query(sql, ((error, results, fields) => {
    res.json(results)
  }))
});
// banner图
router.get('/banner', (req, res, next) => {
  var sql = $sql.index.banner
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

router.post('/list', (req, res) => {
  var sql = $sql.product.list;
  var params = req.body;
  connection.query(sql, [params.name], (err, result) => {
    if (err) {       
      console.log(err);
    }
    if (result) {
      const lists = {}
      for(const i in result) {
        const obj = {
          id: result[i].id,
          title: result[i].title,
          bigImg: result[i].main_image,
          price: result[i].price
        }
        if (result[i].name in lists) {
          lists[result[i].name].push(obj)
        } else {
          lists[result[i].name] = [obj]
        }
      }
      jsonWrite(res, lists);
      res.end('is over');
    }
  })
});

router.post('/detail', (req, res) => {
  var sql = $sql.product.detail;
  var params = req.body;
  connection.query(sql, [params.id], (err, result) => {
    if (err) {       
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result[0]);
      res.end('is over');
    }
  })
});

router.post('/like', (req, res) => {
  var sql = $sql.product.like;
  var params = req.body;
  connection.query(sql, [params.id, params.category_id], (err, result) => {
    if (err) {       
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
      res.end('is over')
    }
  })
});

router.post('/news', (req, res) => {
  var sql = $sql.product.news
  var params = req.body
  connection.query(sql, [params.id], (err, result) => {
    if (err) {       
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
      res.end('is over')
    }
  })
});

router.post('/search', (req, res) => {
  var sql = $sql.product.search
  var params = req.body
  connection.query(sql, [params.search, params.search], (err, result) => {
    if (err) {       
      console.log(err)
    }
    if (result) {
      console.log(sql)
      jsonWrite(res, result)
      res.end('is over')
    }
  })
});

module.exports = router;
