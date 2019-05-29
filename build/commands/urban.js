"use strict";

var request = require('request');

var ud = require('urban-dictionary');

exports.commandString = 'define';

exports.execute = function (commandString, callback) {
  ud.term(commandString, (error, entries, tags, sounds) => {
    if (error) {
      console.log("Error defining word:");
      console.error(error.message);
    } else {
      if (entries.length > 0) {
        var string = 'Definition of "' + entries[0].word + '":\n' + entries[0].definition + "\n" + "Example usage: " + entries[0].example;
        callback(string);
      }
    }
  });
};