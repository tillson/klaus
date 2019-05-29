"use strict";

var _chronoNode = _interopRequireDefault(require("chrono-node"));

var _request = _interopRequireDefault(require("request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

exports.commandString = 'phish';

exports.execute = function (commandString, callback) {
  console.log('phish' + commandString);
  var query = commandString.toLowerCase();

  if (query.indexOf('setlist') > -1 || query.indexOf('play')) {
    var date = _chronoNode["default"].parseDate(query);

    console.log(yyyymmdd(date));
    (0, _request["default"])('http://phish.in/api/v1/shows/' + yyyymmdd(date), {
      headers: {
        'Authorization': 'Bearer ' + process.env.PHISH_API
      }
    }, function (error, resp, body) {
      var json = JSON.parse(body).data;

      if (!json) {
        return;
      }

      var response = json.date + ' ' + json.venue.name + ', ' + json.venue.location + '';

      var sets = _toConsumableArray(new Set(json.tracks.map(function (item) {
        return item.set_name;
      })));

      var setSongs = {};

      for (var i = 0; i < sets.length; i++) {
        setSongs[sets[i]] = [];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = json.tracks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          song = _step.value;
          setSongs[song.set_name].push(song);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = sets[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          set = _step2.value;
          response += '\n' + set + ': ';

          for (var i = 0; i < setSongs[set].length; i++) {
            var song = setSongs[set][i];
            response += song.title + (song.duration > 10 * 1000 * 60 ? ' (' + Math.round(song.duration / 1000 / 60) + ')' : '') + (i == setSongs[set].length - 1 ? '' : ', ');
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
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