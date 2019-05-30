// Klaus for GroupMe
import Bot from '../bot';
import HTTPS from 'https';

export default class GroupMeBot extends Bot {

  constructor(options) {
    super(options);
    this.challenge = '';
  }

  routes = (app) => {
    const options = this.options;
    const handleMessage = this.handleMessage;
    app.post('/groupme/bot', function(req, res) {
      if (req.body.token == options.GROUPME_BOT_ID) {
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


  sendMessage(message) {
    var options, body, botReq;

    options = {
      hostname: 'api.groupme.com',
      path: '/v3/bots/post',
      method: 'POST'
    };

    body = {
      'bot_id' : this.options.BOT_ID,
      'text' : message.text
    };

    botReq = HTTPS.request(options, function(res) {
        if(res.statusCode == 202) {
          //neat
        } else {
          console.log('rejecting bad status code ' + res.statusCode);
        }
    });

    botReq.on('error', function(err) {
      console.log('error posting message '  + JSON.stringify(err));
    });
    botReq.on('timeout', function(err) {
      console.log('timeout posting message '  + JSON.stringify(err));
    });
    botReq.end(JSON.stringify(body));
  }


}

