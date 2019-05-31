"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bot = _interopRequireDefault(require("../bot"));

var _webApi = require("@slack/web-api");

var _commandtrigger = require("../commands/commandtrigger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SlackBot extends _bot.default {
  constructor(_options) {
    super(_options);

    _defineProperty(this, "routes", app => {
      const options = this.options;
      const onMessageTrigger = this.onMessageTrigger;
      app.post('/slack/eventSubscription', function (req, res) {
        if (req.body.token == options.SLACK_SIGNING_SECRET) {
          if (req.body.event) {
            const event = req.body.event;

            if (event.type == 'app_mention') {
              onMessageTrigger(event);
            }
          }

          return res.status(200).send(req.body.challenge);
        } else {
          return res.status(403).json({
            status: 403,
            error: 'Unauthorized.'
          });
        }
      });
    });

    _defineProperty(this, "onMessageTrigger", async payload => {
      const text = payload.text.replace(/^\<.*\>\s/, "");

      for (var i = 0; i < this.components.length; i++) {
        if (this.components[i].commandString && this.components[i].stringStartsWithCommand(text)) {
          this.components[i].handleCommand(text, {
            payload: payload
          });
        }
      }
    });

    _defineProperty(this, "sendMessage", async (message, data) => {
      try {
        if (!message.text) {
          throw new Error('Channel and text must not be null in a Slack message.');
        }

        if (this.options.channel) {
          message.channel = this.options.channel;
        }

        if (data && data.payload && data.payload.channel) {
          message.channel = data.payload.channel;
        }

        if (!message.channel) {
          throw new Error('Slack messages must have a channel.');
        }

        const response = await this.web.chat.postMessage({
          // channel: message.channel ? message.channel : this TODO MAKE THIS RESPOND TO PEOPLE, ATTACHMENTS?,
          text: message.text + (message.url ? ' ' + message.url : ''),
          icon_url: message.thumbnail ? message.thumbnail : null,
          username: message.title ? message.title : null,
          channel: message.channel
        });
      } catch (err) {
        console.log(err);
      }
    });

    this.challenge = '';
    this.web = new _webApi.WebClient(this.options.SLACK_CLIENT_SECRET);
  }
  /*
  * Routes (override)
  * We define some routes for our built-in trigger event
  * onMessageTrigger to get data from.
  */


}

exports.default = SlackBot;