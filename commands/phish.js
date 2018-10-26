var chrono = require('chrono-node');
var request = require('request');

exports.commandString = 'phish';

exports.execute = function(commandString, callback) {
  var query = commandString.toLowerCase();
  if (query.indexOf('setlist') > -1 || query.indexOf('play')) {
    var date = chrono.parseDate(query);

    request('http://phish.in/api/v1/shows/' + date.yyyymmdd(), function(error, resp, body) {
        var json = JSON.parse(body).data;
        if (!json) { return; }
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
            response += song.title
              + (song.duration > (10*1000*60) ? ' (' + Math.round(song.duration/1000/60) + ')' : '')
              + (i == setSongs[set].length - 1 ? '' : ', ');
          }
        }
        response += '\nListen link: ' + 'https://phish.in/' + json.date;
        callback(response);
    });
  }
};

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear() + '-',
          (mm>9 ? '' : '0') + mm + '-',
          (dd>9 ? '' : '0') + dd
         ].join('');
};
