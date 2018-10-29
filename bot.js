var HTTPS = require('https');
var request = require('request');

var botID = process.env.BOT_ID;

exports.modules = [];
function respond() {
  var textMessage = JSON.parse(this.req.chunks[0]);

  if (!textMessage) {
    return;
  }
  var command = textMessage.text.split(' ')[0];
  var query = textMessage.text.substr(textMessage.text.indexOf(' ') + 1).replace('!', '');
  for (module of exports.modules) {
    if (command == '!' + module.commandString) {
      module.execute(query, function(responseText) {
        postMessage(responseText)
      })
      break;
    }
  }
  this.res.writeHead(200);
  this.res.end();
}

function postMessage(response, mention=undefined, mentionLoci=undefined) {
  var botResponse, options, body, botReq;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    'bot_id' : botID,
    'text' : response
  };

  if (mention) {
    body["attachments"] = [
      {
        type: "mentions",
        "user_ids": [mention],
        "loci": [
          mentionLoci
        ]
      }
    ];
  }

  console.log('sending ' + botResponse + ' to ' + botID);

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



exports.respond = respond;