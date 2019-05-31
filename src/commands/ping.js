import CommandTrigger from './commandtrigger';

class PingCommand extends CommandTrigger {
  constructor(bot, options) {
    super(bot, options);
    this.commandString = 'ping';
  }

  handleCommand = (commandString, data) => {
    this.bot.sendMessage({text: 'Pong!'}, data);
  }
}

export default PingCommand;