/*
* Klaus for Slack
* Here, we implement Slack's app_mention event subscription
* as a Klaus message trigger, and implement its sendMessage output.
*/
import Bot from '../bot';
import { WebClient } from '@slack/web-api';
import { CommandTrigger } from '../commands/commandtrigger';

export default class SlackBot extends Bot {
  constructor(options) {
    super(options);
    this.challenge = '';
    this.web = new WebClient(this.options.SLACK_CLIENT_SECRET);
  }

  /*
  * Routes (override)
  * We define some routes for our built-in trigger event
  * onMessageTrigger to get data from.
  */
  routes = (app) => {

    const options = this.options;
    const onMessageTrigger = this.onMessageTrigger;
    app.post('/slack/eventSubscription', function(req, res) {
      if (req.body.token == options.SLACK_SIGNING_SECRET) {
        if (req.body.event) {
          const event = req.body.event;
          if (event.type == 'app_mention') {
            onMessageTrigger(event);
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
    for (var i = 0; i < this.components.length; i++) {
      if (this.components[i].commandString && this.components[i].stringStartsWithCommand(text)) {
        this.components[i].handleCommand(text, { payload: payload });
      }
    }
  }

  /*
  * Send message (override)
  * Slack bots can send messages that its triggers send it.
  * Note that the Slack username field is actually Klaus's title field.
  */
  sendMessage = async (message, data) => {
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
        const response = await this.web.chat.postMessage(
          {
            // channel: message.channel ? message.channel : this TODO MAKE THIS RESPOND TO PEOPLE, ATTACHMENTS?,
            text: message.text + (message.url ? ' ' + message.url : ''),
            icon_url: message.thumbnail ? message.thumbnail : null,
            username: message.title ? message.title : null,
            channel: message.channel
          }
         );
    } catch (err) {
      console.log(err);
    }
  }

}
