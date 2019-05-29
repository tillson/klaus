"use strict";

var request = require('request');

let url_base = 'https://opentdb.com/api.php';
var session_question;
exports.commandString = 'trivia';

exports.execute = function (commandString, callback) {
  if (!session_question) {
    var url = url_base + '?amount=1&type=multiple';
    request(url, function (error, response, body) {
      var results = JSON.parse(body).results;

      if (results && results.length > 0) {
        session_question = results[0];
        var options = session_question.incorrect_answers;
        options.push(session_question.correct_answer);
        session_question.options = shuffle(options);
        var response = "== Trivia ==\n";
        response += convertHTML(session_question.question) + '\n';

        for (var i = 0; i < session_question.options.length; i++) {
          response += i + 1 + ') ' + convertHTML(session_question.options[i]) + '\n';
        }

        response += '\nThis question will expire in 60 seconds.';
        setTimeout(function () {
          session_question = undefined;
        }, 60 * 1000);
        return callback(response);
      }

      return callback('An error occurred while fetching a trivia question.');
    });
  } else {
    var userResponse = parseInt(commandString);

    if (!userResponse || userResponse > 4 || userResponse == 0) {
      return callback('');
    }

    if (session_question[userResponse - 1] == session_question.correct_answer) {
      return callback('Correct!');
      session_question = undefined;
    } else {
      return callback('Wrong!');
    }
  }
};
/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */


function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
}

function convertHTML(str) {
  var entityPairs = [{
    character: '&',
    html: '&amp;'
  }, {
    character: '<',
    html: '&lt;'
  }, {
    character: '>',
    html: '&gt;'
  }, {
    character: "'",
    html: '&apos;'
  }, {
    character: '"',
    html: '&quot;'
  }];
  entityPairs.forEach(function (pair) {
    var reg = new RegExp(pair.character, 'g');
    str = str.replace(reg, pair.html);
  });
  return str;
}