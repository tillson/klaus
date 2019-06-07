import Responder from '../responders/responder';

/*
* Command Trigger
* A good ol' commandName and commandString
*/
class CommandTrigger extends Responder {

  constructor(bot, options) {
    super(bot, options);
    this.commandPrefix = this.options.commandPrefix ? this.options.commandPrefix : '';
    this.commandString = this.commandPrefix
      + (this.options.commandString ? this.options.commandString.trim() : '');
  }

  stringStartsWithCommand(str) {
    return str.indexOf(this.commandString) == 0;
  }

  stringContainsCommand(str) {
    return str.indexOf(this.commandString) > -1;
  }

  /*
  * Subclasses should implement handleCommand
  */
  handleCommand(commandString, data) {

  }


}
export default CommandTrigger;