"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Bot", {
  enumerable: true,
  get: function () {
    return _bot.default;
  }
});
Object.defineProperty(exports, "Trigger", {
  enumerable: true,
  get: function () {
    return _trigger.default;
  }
});
Object.defineProperty(exports, "CommandTrigger", {
  enumerable: true,
  get: function () {
    return _commandtrigger.default;
  }
});
Object.defineProperty(exports, "PingCommand", {
  enumerable: true,
  get: function () {
    return _ping.default;
  }
});

var _bot = _interopRequireDefault(require("./bot"));

var _trigger = _interopRequireDefault(require("./trigger"));

var _commandtrigger = _interopRequireDefault(require("./command/commandtrigger"));

var _ping = _interopRequireDefault(require("./command/ping"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }