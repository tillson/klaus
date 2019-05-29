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
Object.defineProperty(exports, "SlackBot", {
  enumerable: true,
  get: function () {
    return _slack.default;
  }
});
Object.defineProperty(exports, "ChatComponent", {
  enumerable: true,
  get: function () {
    return _chatComponent.default;
  }
});

var _bot = _interopRequireDefault(require("./bot"));

var _slack = _interopRequireDefault(require("./bots/slack"));

var _chatComponent = _interopRequireDefault(require("./chat-component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }