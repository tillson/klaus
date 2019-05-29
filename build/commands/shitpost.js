"use strict";

var request = require('request');

exports.commandString = 'shitpost';

exports.execute = function (commandString, callback) {
  request('https://www.reddit.com/r/copypasta/.json', function (error, resp, body) {
    var posts = JSON.parse(body).data.children;
    var post = posts[Math.round(Math.random() * posts.length) - 1];

    if (post && post.data && post.data.selftext) {
      callback(post.data.selftext);
    }
  });
};