import CommandTrigger from '../src/commands/commandtrigger';
import DockerResponder from '../src/responders/docker';

class RunDockerImage extends CommandTrigger {
  constructor(bot, options) {
    super(bot, options);
    this.commandString = 'docker';
  }

  handleCommand = async (commandString, data) => {
    console.log(1);
    this.bot.sendMessage({ text: 'Working on it...' }, data);
    const output = await new DockerResponder(this.bot).run({ image: commandString.split(' ')[1

    ] }, data);
    this.bot.sendMessage({text: output}, data);
  }
}

export default RunDockerImage;