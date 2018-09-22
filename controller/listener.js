const mongo = require('arkademy-mongo');
const config = require('../config');
const slack = require('../modules/slack');
const listener = {};

mongo.Connect(config.Mongo, (err, db, dbo) => {
  if (err) throw err;
  console.log('MongoDB Connect');
});

slack.Init(config.SLACK_WEBHOOK_URL, (err, success) => {
  if (err) return console.log(err);
  console.log(success);
});

listener.saveReport = (req, res) => {
  mongo.GetDBObject().collection('report').insertOne(req.body, (err, success) => {
    if (err) return res.status(500).json(err);
    if (req.body.eventType == "Bounce" || req.body.eventType == "Complaint" || req.body.eventType == "Reject" || req.body.eventType == "Rendering Failure") { // custom if params to filter just send to slack bounce mail
      slack.Send(JSON.stringify(req.body), (err, result, body) => {
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
};

module.exports = listener;