const Request = require('request');
var url = null;
var slackPayload = {};
var slack = {};

slack.Init = function (slack_webhook_url, cb) {
    url = slack_webhook_url;

    if (url === null || url === '' || (typeof url === undefined)) {
        cb("url has not been set", null);
    }
    cb(null, "url has been set");
};

slack.Send = function (msg, cb) {
    slackPayload = {
        text: `${msg}`
    };
    Request({
        method: 'POST',
        uri: url,
        body: slackPayload,
        json: true
    }, function (err, res) {
        if (err) throw err;
        cb(err, res);
    });
};

module.exports = slack;