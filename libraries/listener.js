module.exports = {
    
    insertMailReport(data, cb) {
        MongoClient.connect(url, {useNewUrlParser:true}, function(err, client) {
            if (err) return cb(err, null);
            const db = client.db(dbName);
            const collectionName = 'email_reporting';
            const collection = db.collection(collectionName);
            // Insert one documents
            collection.insertOne(data, function(err, result) {
                client.close();
                if (err) return cb(err, null);
                return cb(null, result);
            });
        }); 
    }
    
}