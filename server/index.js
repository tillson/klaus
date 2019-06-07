import express from 'express';
import bodyParser from 'body-parser';
import CLIBot from './cli';
import RunDockerImage from './rundockerimage';

/* Load environment variables */

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
/* Enable your bots */
const bot = new CLIBot();
bot.components.push(
  new RunDockerImage(bot)
)

app.listen(5000, function() {
  console.log('Listening on port 5000');
});