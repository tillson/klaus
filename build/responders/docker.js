"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dockerode = _interopRequireDefault(require("dockerode"));

var _responder = _interopRequireDefault(require("./responder"));

var _stream = _interopRequireDefault(require("stream"));

var _assert = require("assert");

var _crypto = _interopRequireDefault(require("crypto"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* Command Trigger
* A good ol' commandName and commandString
*/
class DockerResponder extends _responder.default {
  constructor(bot, options) {
    super(bot, options);
  }

  async run(parameters, data) {
    if (!parameters.image) {
      return this.bot.sendMessage({
        text: 'I\'m having some trouble helping with that.'
      }, data);
    }

    const docker = new _dockerode.default(this.options.dockerOptions);

    const file = '/tmp/docker-' + _crypto.default.randomBytes(8).toString('hex');

    const writeStream = _fs.default.createWriteStream(file);

    await docker.run(parameters.image, parameters.parameters, writeStream);
    const dockerData = await _fs.default.readFileSync(file, 'utf8');
    return dockerData;
  }

}

var _default = DockerResponder;
exports.default = _default;