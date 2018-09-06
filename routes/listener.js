var express = require('express');
var router = express.Router();
var listener = require('../controller/listener');

router.post('/report', listener.saveReport);

module.exports = router;