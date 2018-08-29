var express = require('express');
var router = express.Router();
var listener = require('../controller/listener')

router.post('/report', listener.insert_mail_report)
router.post('/report_and_send_slack', listener.insert_mail_report_and_send_slack)  

module.exports = router;
  