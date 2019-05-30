"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _trigger = _interopRequireDefault(require("../trigger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* Command Trigger
* A good ol' commandName and commandString
*/
class CommandTrigger extends _trigger.default {
  constructor(bot, options) {
    super(bot, options);
    this.commandPrefix = this.options.commandPrefix ? this.options.commandPrefix : '';
    this.commandString = this.commandPrefix + (this.options.commandString ? this.options.commandString.trim() : '');
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


  handleCommand(commandString) {}

}

var _default = CommandTrigger;
exports.default = _default;