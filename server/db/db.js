var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'record',
  port: '3306',
  multipleStatements: true // 允许执行多条语句
})

module.exports = connection
console.log('success listen at port:3000......');
