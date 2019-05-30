"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SlackBot", {
  enumerable: true,
  get: function () {
    return _slack.default;
  }
});
Object.defineProperty(exports, "GroupMeBot", {
  enumerable: true,
  get: function () {
    return _groupme.default;
  }
});

var _slack = _interopRequireDefault(require("./bots/slack"));

var _groupme = _interopRequireDefault(require("./bots/groupme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }