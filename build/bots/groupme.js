"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// KlausBot for GroupMe
var GroupMeBot =
/*#__PURE__*/
function (_Bot) {
  _inherits(GroupMeBot, _Bot);

  function GroupMeBot(_bot) {
    var _this;

    _classCallCheck(this, GroupMeBot);

    return _possibleConstructorReturn(_this);
  }

  _createClass(GroupMeBot, [{
    key: "sendMessage",
    value: function sendMessage(message) {
      var options, body, botReq;
      options = {
        hostname: 'api.groupme.com',
        path: '/v3/bots/post',
        method: 'POST'
      };
      body = {
        'bot_id': BOT_ID,
        'text': message
      };
      botReq = HTTPS.request(options, function (res) {
        if (res.statusCode == 202) {//neat
        } else {
          console.log('rejecting bad status code ' + res.statusCode);
        }
      });
      botReq.on('error', function (err) {
        console.log('error posting message ' + JSON.stringify(err));
      });
      botReq.on('timeout', function (err) {
        console.log('timeout posting message ' + JSON.stringify(err));
      });
      botReq.end(JSON.stringify(body));
    }
  }]);

  return GroupMeBot;
}(Bot);