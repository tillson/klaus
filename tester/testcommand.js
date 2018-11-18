/**
 * Run this with "npm test [file] [command]"
 * Example: npm test commands/weather.js "what will the weather be like today"
 * If the command doens't have subargs, you can leave [command] blank.
**/

const path = require('path');

console.log(process.argv[2]);

if (!process.argv || process.argv.length < 3) {
    console.log('Usage: npm test [file] \"[command]\"');
    return;
}
var testFile = path.dirname(require.main.filename) + '/../' + process.argv[2];
var command = require(testFile);

var subcommandArgs = process.argv.length < 4 ? '' : process.argv[3];
command.execute(subcommandArgs, function(output) {
    console.log(output);
});