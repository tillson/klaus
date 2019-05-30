import CommandTrigger from './commandtrigger';

class PingCommand extends CommandTrigger {
  constructor(bot, options) {
    super(bot, options);
    this.commandString = 'ping';
  }

  handleCommand = (commandString) => {
    console.log('Pong!');
  }
}

export default PingCommand;