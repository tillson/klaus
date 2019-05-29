import Bot from './bot';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

/* Load environment variables */

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

/* Enable your bots */
import SlackBot from './bots/slack'
const bot = new SlackBot({
  SLACK_SIGNING_SECRET: process.env.SLACK_SIGNING_SECRET,
  SLACK_CLIENT_SECRET: process.env.SLACK_CLIENT_SECRET
});
bot.routes(app);

app.listen(5000, function() {
  console.log('Listening on port 5000');
});