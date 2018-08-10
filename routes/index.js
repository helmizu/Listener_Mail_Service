var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'analytics';

router.post('/report', function(req, res) {
  let data = req.body
  
  MongoClient.connect(url, {useNewUrlParser:true}, function(err, client) {
    if (err) return res.status(400).json(err);
    const db = client.db(dbName);
    const collectionName = 'email_reporting';
    const collection = db.collection(collectionName);
    // Insert one documents
    collection.insertOne(data, function(err, r) {
      if (err) return res.status(400).json(err);
      return res.send(r);
    });
  });
  
})
module.exports = router;
