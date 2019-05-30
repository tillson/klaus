/*
* Trigger
* Triggers for Klaus should subclass this.
* and implement any other useful commands (cron, webhooks, commands, etc.)
*/
class Trigger {

  constructor(bot, options) {
    this.bot = bot;
    this.options = options ? options : {};
  }

  /* Express routes for your component */
  routes(app) {

  }

}

export default Trigger;