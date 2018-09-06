const mongo = require('arkademy-mongo');
const config = require('../config');
const SlackMsg = require('../modules/SlackMsg');
const slack = new SlackMsg(config.SLACK_WEBHOOK_URL);
const listener = {};

listener.saveReport = (req, res) => {
  mongo.Connect(config.Mongo, (err, db, dbo) => {
    if (err) return res.status(500).json(err);
    dbo.collection('report').insertOne(req.body, (err, success) => {
      db.close();
      if (err) return res.status(500).json(err);
      if (req.body) { // custom if params to filter just send to slack bounce mail
        slack.send(req.body, (err, result, body) => {
          if (!err) {
            res.status(201).json({
              msg: "data inserted and send to slack"
            });
          } else {
            res.status(201).send({
              msg: "data inserted without send to slack"
            });
          }
        });
      } else {
        res.status(201).send({
          msg: "data inserted"
        });
      }
    });
  });
};

module.exports = listener;