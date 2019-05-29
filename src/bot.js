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

  setComponents = (components) => {
    this.components = components;
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

  /*
  * Keep in mind that the least common denominator between chat messages is the `text` option.
  * message:
  * @param text `The text of the message` (required)
  * @param channel `The channel to post in, if supported`
  * @param thumbnail `Thumbnail to go with message`
  * @param title `Title text for message`
  * @param url `URL for message to link to`
  * @param username `Custom username`
  */
  sendMessage = (message) => {
  }



}
