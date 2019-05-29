"use strict";

exports.commandString = 'clap';

exports.execute = function (commandString, callback) {
  var words = commandString.trim().split(" ");
  var string = "";

  for (var i = 0; i < words.length; i++) {
    string += words[i] + " 👏 ";
  }

  callback(string);
};