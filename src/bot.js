export default class Bot {

  constructor(options) {
    this.functionalities = [];
    this.options = options;
    this.commands = options && options.commands ? this.options.commands : [];
    this.components = options && options.components ? this.options.commands : [];
    this.loadCommands();
  }


routes(app) {

}

 hasFunctionality = (functionality) => {
  return false;
 }

 loadCommands = () => {
  //  if (this.options.defaultCommands) {
     this.commands.push(require('./commands/ask'));
     this.commands.push(require('./commands/clap'));
     this.commands.push(require('./commands/phish'));
     this.commands.push(require('./commands/shitpost'));
     this.commands.push(require('./commands/source'));
     this.commands.push(require('./commands/trivia'));
     this.commands.push(require('./commands/urban'));
     this.commands.push(require('./commands/weather'));
  //  }
 }

 sendMessage = (message, channel) => {
 }

}
