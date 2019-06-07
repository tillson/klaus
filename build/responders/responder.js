"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*
* Responders
* Responders for Klaus should subclass this.
* and implement any other useful things (cron, webhooks, commands, etc.)
*
* Klaus responders are invoked by *something* and either
* forward data onto the next responder in a chain or complete
* one by terminating at some final action (e.g. sending a message through the bot).
*/
class Responder {
  constructor(bot, options) {
    this.bot = bot;
    this.options = options ? options : {};
  }
  /* Express routes for your component */


  routes(app) {}
  /*
  Run something somehow with some parameters and return something else.
  @return A Bot data object
  */


  run(parameters, data) {}

}

var _default = Responder;
exports.default = _default;