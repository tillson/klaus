"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _commandtrigger = _interopRequireDefault(require("./commandtrigger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class PingCommand extends _commandtrigger.default {
  constructor(bot, options) {
    super(bot, options);

    _defineProperty(this, "handleCommand", (commandString, data) => {
      this.bot.sendMessage({
        text: 'Pong!'
      }, data);
    });

    this.commandString = 'ping';
  }

}

var _default = PingCommand;
exports.default = _default;