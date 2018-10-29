exports.commandString = 'clap';
exports.execute = function(commandString, callback) {
    var words = commandString.split(" ");
    var string = "";
    for (var i = 0; i < words.length; i++) {
        string += words[i] + (i+1 != words.length ? " 👏 " : "");
    }
    callback(string);
}