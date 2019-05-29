"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Bot =
/*#__PURE__*/
function () {
  function Bot(options) {
    var _this = this;

    _classCallCheck(this, Bot);

    _defineProperty(this, "hasFunctionality", function (functionality) {
      return false;
    });

    _defineProperty(this, "loadCommands", function () {
      //  if (this.options.defaultCommands) {
      _this.commands.push(require('./commands/ask'));

      _this.commands.push(require('./commands/clap'));

      _this.commands.push(require('./commands/phish'));

      _this.commands.push(require('./commands/shitpost'));

      _this.commands.push(require('./commands/source'));

      _this.commands.push(require('./commands/trivia'));

      _this.commands.push(require('./commands/urban'));

      _this.commands.push(require('./commands/weather')); //  }

    });

    _defineProperty(this, "sendMessage", function (message, channel) {});

    this.functionalities = [];
    this.options = options;
    this.commands = options && options.commands ? this.options.commands : [];
    this.components = options && options.components ? this.options.commands : [];
    this.loadCommands();
  }

  _createClass(Bot, [{
    key: "routes",
    value: function routes(app) {}
  }]);

  return Bot;
}();

exports["default"] = Bot;