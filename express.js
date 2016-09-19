var express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://next:next2000@125.209.199.224:27017/housing',
    formidable = require('formidable'),
    fs = require('fs'),
    ejs = require('ejs');

var savePath = './upload/';

var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
//app.use(app.router);
app.use('/public', express.static(__dirname + '/public'));
//app.use('/img', express.static('img'));

app.get('/', function(req, res) {
  res.render('index', {});
});

app.get('/info/:aveType/:state', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if(err) throw err;
    var query = { _id: Number(req.params.state) };
    var aveType = req.params.aveType;
    var collection = db.collection(aveType);
    collection.find(query).toArray(function(err, docs) {
      if(err) throw err;
      res.end(JSON.stringify(docs));
    });
  });
});

app.get('/info/:aveType', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if(err) throw err;
    var query = {};
    var aveType = req.params.aveType;
    var collection = db.collection(aveType);
    collection.find(query).sort({ave:-1}).toArray(function(err, docs) {
      if(err) throw err;
      res.end(JSON.stringify(docs));
    });
  });
});

app.listen(5009);
