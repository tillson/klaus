var request = require('request');

/*
!source command
Acts as an example of how to add a new command to the bot
Note: To make the command live, you have to add it to the modules array in index.js
*/


// Initial command (without the ! in front of it)
exports.commandString = 'jurist';

// This executes when the command is called.
// Do your processing for the query in here and spit out text using the callback.
// @args commandString The "query" of the command.  Does not include the initial !command invokation
// @args callback The callback to call the API to actually send the message.
//                Pass the callback the text you want the bot to say.
exports.execute = function(commandString, callback) {
    callback("Hey there! I'm Jurist Chan, a graphic designer with 3 years of experience with Photoshop and Illustrator. I'm currently a senior in high school, but that's not the only reason why I'm a student. I'm always learning about new ways to create and finding new inspiration; in that regard, I'm going to be a student until the day I die. I'm big on clean, minimalistic designs, and I'm best at designing logos.");
}
