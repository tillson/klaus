var http = require('http');
var director = require('director');
var bot = require('./bot.js');

/* Enabling Modules */
bot.modules.push(require('./commands/ask'));
bot.modules.push(require('./commands/phish'));
bot.modules.push(require('./commands/shitpost'));
bot.modules.push(require('./commands/urban'));
bot.modules.push(require('./commands/source'));

//

router = new director.http.Router({
  '/' : {
    post: bot.respond,
    get: ping
  }
});

server = http.createServer(function (req, res) {
  req.chunks = [];
  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());
  });

  router.dispatch(req, res, function(err) {
    res.writeHead(err.status, {"Content-Type": "text/plain"});
    res.end(err.message);
  });
});

port = Number(process.env.PORT || 5000);
server.listen(port);

function ping() {
  this.res.writeHead(200);
  this.res.end("/");
}