const SlackMsg = require('../modules/SlackMsg')
const listener = require('../libraries/listener')
const config = require('../config')
const slack = new SlackMsg(config.SLACK_WEBHOOK_URL)

function insert_mail_report(req, res) {
  const data = req.body
  listener.insertMailReport(
    data, 
    function(err, result){
      if (err) return res.status(500).json(err)
      res.status(201).json({msg : "success"})
    }
  )
}

function insert_mail_report_and_send_slack(req, res) {
    const data = req.body
    listener.insertMailReport(
      data, 
      function(err, result){
        if (err) return res.status(500).json(err)
        
        slack.send(data, function (err, respond, body) {
            if (err) return res.status(500).json(err)
            res.status(201).json({msg : "success"})
        })
      }
    )
  }

module.exports = { insert_mail_report, insert_mail_report_and_send_slack }