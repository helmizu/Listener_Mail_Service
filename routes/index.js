var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'analytics';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/report', function(req, res) {
  let data = req.body
  
  MongoClient.connect(url, {useNewUrlParser:true}, function(err, client) {
    if (err) res.status(400).json(err);
    const db = client.db(dbName);
    const collectionName = 'email_reporting';
    const collection = db.collection(collectionName);
    // Insert one documents
    collection.insertOne(data, function(err, r) {
      if (err) res.status(400).json(err);
      res.send(r);
    });
  });
  
})
module.exports = router;
