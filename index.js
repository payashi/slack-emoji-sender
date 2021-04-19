/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

var request = require('request');

stamp = (payload) => {
    var token = process.env.SLACK_OAUTH_TOKEN;
    var channel = payload.event.channel;
    var timestamp = payload.event.ts;

    var options = {
        url: `https://slack.com/api/reactions.add?token=${token}&channel=${channel}&timestamp=${timestamp}&name=eyes`,
        method: 'POST'
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }

    request(options, callback);
};

const onRequest = (req, res) => {
    const payload = req.body;
    if (payload.type === 'url_verification') {
        return res.status(200).json({ 'challenge': payload.challenge });
    }
    if (payload.event) {
        stamp(payload);
        res.status(200).send('OK');
    }
}

exports.slackBot = onRequest;