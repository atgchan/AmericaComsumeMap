var mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'vudghk3',
  database : 'test'
});

connection.connect();

connection.query('SELECT * FROM restaurant',
  function(err, rows, field) {
    if(err) throw err;

    console.log('results : ', rows);
  });

  connection.end();
