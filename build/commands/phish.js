"use strict";

var _chronoNode = _interopRequireDefault(require("chrono-node"));

var _request = _interopRequireDefault(require("request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.commandString = 'phish';

exports.execute = function (commandString, callback) {
  console.log('phish' + commandString);
  var query = commandString.toLowerCase();

  if (query.indexOf('setlist') > -1 || query.indexOf('play')) {
    var date = _chronoNode.default.parseDate(query);

    console.log(yyyymmdd(date));
    (0, _request.default)('http://phish.in/api/v1/shows/' + yyyymmdd(date), {
      headers: {
        'Authorization': 'Bearer ' + process.env.PHISH_API
      }
    }, function (error, resp, body) {
      var json = JSON.parse(body).data;

      if (!json) {
        return;
      }

      var response = json.date + ' ' + json.venue.name + ', ' + json.venue.location + '';
      var sets = [...new Set(json.tracks.map(item => item.set_name))];
      var setSongs = {};

      for (var i = 0; i < sets.length; i++) {
        setSongs[sets[i]] = [];
      }

      for (song of json.tracks) {
        setSongs[song.set_name].push(song);
      }

      for (set of sets) {
        response += '\n' + set + ': ';

        for (var i = 0; i < setSongs[set].length; i++) {
          var song = setSongs[set][i];
          response += song.title + (song.duration > 10 * 1000 * 60 ? ' (' + Math.round(song.duration / 1000 / 60) + ')' : '') + (i == setSongs[set].length - 1 ? '' : ', ');
        }
      }

      response += '\nListen link: ' + 'https://phish.in/' + json.date;
      callback(response);
    });
  }
};

function yyyymmdd(date) {
  if (!date) {
    return;
  }

  var mm = date.getMonth() + 1; // getMonth() is zero-based

  var dd = date.getDate();
  return [date.getFullYear() + '-', (mm > 9 ? '' : '0') + mm + '-', (dd > 9 ? '' : '0') + dd].join('');
}

;