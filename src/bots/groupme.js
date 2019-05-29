// KlausBot for GroupMe

class GroupMeBot extends Bot {

  constructor(bot) {

  }

  routes = {
    '/' : {
      post: bot.respond,
      get: ping
    }
  }
  BOT_ID = process.env.BOT_ID;

  sendMessage(message) {
    var options, body, botReq;

    options = {
      hostname: 'api.groupme.com',
      path: '/v3/bots/post',
      method: 'POST'
    };

    body = {
      'bot_id' : BOT_ID,
      'text' : message
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

