// KlausBot for Slack
import Bot from '../bot';
import { WebClient } from '@slack/web-api';

export default class SlackBot extends Bot {
  constructor(options) {
    super(options);
    this.options = options;
    this.challenge = '';
    this.web = new WebClient(options.SLACK_CLIENT_SECRET);
  }

  routes = (app) => {
    const options = this.options;
    const handleMessage = this.handleMessage;
    app.post('/slack/eventSubscription', function(req, res) {
      if (req.body.token == options.SLACK_SIGNING_SECRET) {
        if (req.body.event) {
          const event = req.body.event;
          if (event.type == 'app_mention') {
            handleMessage(event);
          }
        }
        return res.status(200).send(req.body.challenge);
      } else {
        return res.status(403).json({status: 403, error: 'Unauthorized.'});
      }

    });
  }

  // sendMessage(message) {
  // }

  handleMessage = async (payload) => {
    const text = payload.text.replace(/^\<.*\>\s/, "");
    for (var i = 0; i < this.commands.length; i++) {
      var command = this.commands[i];
      if (text.indexOf(command.commandString) > -1) {
        command.execute(text, (response) => {
          this.sendMessage(response, payload.channel);
        });
      }
    }
  }

  /* Slack API */
  sendMessage = async (text, channel) => {
    try {
      if (!channel) {
        throw new Error("Channel must not be null in a Slack bot message.");
      }
      const response = await this.web.chat.postMessage({ channel: channel, text: text });
    } catch (err) {
      console.log(err);
    }
  }

}
