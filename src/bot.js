/*
* Bot
* All Klaus outputs should subclass this.
* Like a neuron, bots can take certain *inputs* and can emit *outputs*.
* These inputs can come from components tasks or invocation events.
* Outputs can be to stdout, a file, or even Slack.
* Bots choose which input and output functions to implement, and will only
* be invoked when a Trigger calls it.
* See `src/bots/slack.js` for an example.
*/
export default class Bot {

  constructor(options) {
    this.functionalities = [];
    this.options = options;
    this.commands = options && options.commands ? this.options.commands : [];
    this.components = options && options.components ? this.options.commands : [];
    this.loadCommands();
  }


  /*
  * Routes
  * @param app An Express app instance
  * Define some express routes for your bot's components
  * to listen for triggers on.
  */
  routes(app) {
    for (var i = 0; i < this.components.length; i++) {
      if (this.components[i].routes) {
        this.components[i].routes();
      }
    }
  }

  /*
  * Set components helper
  * @param components to load into bot
  */
  setComponents = (components) => {
    this.components = components;
  }

  /*
  * On message trigger event
  * @param message payload (usually contains invocation input)
  * Respond to messages sent to the bot (e.g. Slack mention)
  */
  onMessageTrigger(payload) {

  }

  /*
  * sendMessage
  * @param message The message to send to an output.
  * Keep in mind that the least common denominator between chat messages is the `text` option.
  * message:
  * @param text `The text of the message` (required)
  * @param channel `The channel to post in, if supported`
  * @param thumbnail `Thumbnail to go with message`
  * @param title `Title text for message`
  * @param url `URL for message to link to`
  * @param username `Custom username`
  */
  sendMessage(message) {

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



}
