"use strict";

var request = require('request');
/*
!source command
Acts as an example of how to add a new command to the bot

Note: To make the command live, you have to add it to the modules array in index.js
*/
// Initial command (without the ! in front of it)


exports.commandString = 'source'; // This executes when the command is called.
// Do your processing for the query in here and spit out text using the callback.
// @args commandString The "query" of the command.  Does not include the initial !command invokation
// @args callback The callback to call the API to actually send the message.
//                Pass the callback the text you want the bot to say.

exports.execute = function (commandString, callback) {
  callback("you can see my insides at https://github.com/tillson/klausbot");
};