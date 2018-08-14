var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'analytics';

router.post('/report', function(req, res) {
  const data = req.body
  insertMailReport(
    data, 
    function(err){
      res.status(500).json(err)
    },
    function(r){
      res.status(201).json({msg : "success"})
    })
  })
  
  function insertMailReport(data, error, callback) {
    MongoClient.connect(url, {useNewUrlParser:true}, function(err, client) {
      if (err) return error(err);
      const db = client.db(dbName);
      const collectionName = 'email_reporting';
      const collection = db.collection(collectionName);
      // Insert one documents
      collection.insertOne(data, function(err, r) {
        client.close();
        if (err) return error(err);
        return callback(r);
      });
    }); 
  }
  module.exports = router;
  