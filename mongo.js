var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://next:next2000@125.209.199.224:27017/company';

MongoClient.connect(url, function(err, db) {
  var collection = db.collection('employee');
  if(err) throw err;

  collection.find({'ssn':1002}).toArray(function(err, docs) {
    if(err) throw err;
    console.log(docs);
  });
  db.close();
});
