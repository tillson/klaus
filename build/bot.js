"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Bot {
  constructor(options) {
    _defineProperty(this, "hasFunctionality", functionality => {
      return false;
    });

    _defineProperty(this, "setComponents", components => {
      this.components = components;
    });

    _defineProperty(this, "loadCommands", () => {
      //  if (this.options.defaultCommands) {
      this.commands.push(require('./commands/ask'));
      this.commands.push(require('./commands/clap'));
      this.commands.push(require('./commands/phish'));
      this.commands.push(require('./commands/shitpost'));
      this.commands.push(require('./commands/source'));
      this.commands.push(require('./commands/trivia'));
      this.commands.push(require('./commands/urban'));
      this.commands.push(require('./commands/weather')); //  }
    });

    _defineProperty(this, "sendMessage", message => {});

    this.functionalities = [];
    this.options = options;
    this.commands = options && options.commands ? this.options.commands : [];
    this.components = options && options.components ? this.options.commands : [];
    this.loadCommands();
  }

  routes(app) {}

}

exports.default = Bot;