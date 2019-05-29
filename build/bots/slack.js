"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bot = _interopRequireDefault(require("../bot"));

var _webApi = require("@slack/web-api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SlackBot =
/*#__PURE__*/
function (_Bot) {
  _inherits(SlackBot, _Bot);

  function SlackBot(_options) {
    var _this;

    _classCallCheck(this, SlackBot);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SlackBot).call(this, _options));

    _defineProperty(_assertThisInitialized(_this), "routes", function (app) {
      var options = _this.options;
      var handleMessage = _this.handleMessage;
      app.post('/slack/eventSubscription', function (req, res) {
        if (req.body.token == options.SLACK_SIGNING_SECRET) {
          if (req.body.event) {
            var event = req.body.event;

            if (event.type == 'app_mention') {
              handleMessage(event);
            }
          }

          return res.status(200).send(req.body.challenge);
        } else {
          return res.status(403).json({
            status: 403,
            error: 'Unauthorized.'
          });
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleMessage",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(payload) {
        var text, i, command;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                text = payload.text.replace(/^\<.*\>\s/, "");

                for (i = 0; i < _this.commands.length; i++) {
                  command = _this.commands[i];

                  if (text.indexOf(command.commandString) > -1) {
                    command.execute(text, function (response) {
                      _this.sendMessage(response, payload.channel);
                    });
                  }
                }

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "sendMessage",
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(message) {
        var response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                if (message && message.channel && message.text) {
                  _context2.next = 3;
                  break;
                }

                throw new Error('Channel and text must not be null in a Slack message.');

              case 3:
                _context2.next = 5;
                return _this.web.chat.postMessage({
                  channel: message.channel,
                  text: message.text,
                  icon_url: message.thumbnail ? message.thumbnail : null
                });

              case 5:
                response = _context2.sent;
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 8]]);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());

    _this.options = _options;
    _this.challenge = '';
    _this.web = new _webApi.WebClient(_options.SLACK_CLIENT_SECRET);
    return _this;
  }

  return SlackBot;
}(_bot["default"]);

exports["default"] = SlackBot;