import Docker from 'dockerode';
import Responder from './responder';
import Writable from 'stream';
import { doesNotReject } from 'assert';
import crypto from 'crypto';
import fs from 'fs';

/*
* Command Trigger
* A good ol' commandName and commandString
*/
class DockerResponder extends Responder {

  constructor(bot, options) {
    super(bot, options);
  }

  async run(parameters, data) {
    if (!parameters.image) { return this.bot.sendMessage({ text: 'I\'m having some trouble helping with that.' }); }
    const docker = new Docker(this.options.dockerOptions);
    const file = '/tmp/docker-' + crypto.randomBytes(8).toString('hex');
    const writeStream = fs.createWriteStream(file);
    try {
      const container = await docker
        .run(parameters.image, parameters.parameters, writeStream);
      const data = await fs.readFileSync(file);
      return data.toString();
    } catch (err) {
      return this.bot.sendMessage({ text: 'I\'m having some trouble helping with that.' });
    }
  }
}

export default DockerResponder;