/*
* Klaus for Slack
* Here, we implement Slack's app_mention event subscription
* as a Klaus message trigger, and implement its sendMessage output.
*/
import Bot from '../bot';
import { WebClient } from '@slack/web-api';

export default class SlackBot extends Bot {
  constructor(options) {
    super(options);
    this.options = options;
    this.challenge = '';
    this.web = new WebClient(options.SLACK_CLIENT_SECRET);
  }

  /*
  * Routes (override)
  * We define some routes for our built-in trigger event
  * onMessageTrigger to get data from.
  */
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

  /*
  * On message trigger event (override)
  * Slack bot receieved a message from one of its triggers.
  */
  onMessageTrigger = async (payload) => {
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

  /*
  * Send message (override)
  * Slack bots can send messages that its triggers send it.
  */
  sendMessage = async (message) => {
    try {
      if (!(message && message.channel && message.text)) {
        throw new Error('Channel and text must not be null in a Slack message.');
      }
        const response = await this.web.chat.postMessage(
          {
            channel: message.channel,
            text: message.text + (message.url ? ' ' + message.url : ''),
            icon_url: message.thumbnail ? message.thumbnail : null,
            username: message.username ? message.username : null
          }
         );
    } catch (err) {
      console.log(err);
    }
  }

}
