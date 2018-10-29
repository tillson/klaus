var chrono = require('chrono-node');
var request = require('request');

exports.commandString = 'weather';

var COORDINATES = "33.774846,-84.397838"

exports.execute = function (commandString, callback) {
    var query = commandString.toLowerCase();
    var date = chrono.parseDate(query);
    if (!process.env["DARKSKY_KEY"]) {
        return callback("Unable to fufill request.  Darksky API key is missing.");
    }
    var epochSeconds = Math.round(date.getTime() / 1000);
    request('https://api.darksky.net/forecast/' + process.env.DARKSKY_KEY + '/' + COORDINATES + ',' + epochSeconds, function (error, resp, body) {
        var json = JSON.parse(body);
        if (!json) { return; }
        var response = '';
        if (json.currently.icon == "rain") {
            response += "Uh oh you should bring an umbrella tomorrow ☔ or you're gonna be wet! 💦💦\n"
        } else if (json.currently.temperature < 60.0) {
            response += "it's gonna be COLD COLD COLD COLD COLD tomorrow wear a jacket 🧥🧥\n"
        } else if (json.currently.temperature > 80.0) {
            response += "it's gonna be hotter than Topeka tomorrow! try to keep cool!\n"
        } else {
            response += json.currently.summary + ".";
        }
        response += "Average temperature of " + Math.round(json.currently.temperature) + "˚. Forecast is for " + date.formatTime() + ".";
        callback(response);
    });
};

Date.prototype.formatTime = function() {
    var string = ""
    string += (this.getHours() > 12 ? this.getHours() - 12 : this.getHours());
    string += ":" + (this.getMinutes() > 10 ? this.getMinutes() : "0" + this.getMinutes());
    string += (this.getHours() > 12 ? "PM" : "AM");
    return string;
}