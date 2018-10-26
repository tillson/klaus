var request = require('request');

exports.commandString = 'ask';
exports.execute = function(commandString, callback) {
    var query = encodeURIComponent(commandString);
    if (!process.env.WOLFRAM_KEY) {
        console.log('Error: unable to satisfy !ask command request because WOLFRAM_KEY is not set.');
        callback("I can't do that right now.");
        return;
    }
    request('https://api.wolframalpha.com/v1/result?i=' + query + '&appid=' + process.env.WOLFRAM_KEY, function(error, resp, body) {
        callback(body);
    })
}