var protoclass = require("protoclass");

var LogLevels     = {};

LogLevels.VERBOSE = 1;
LogLevels.WARN    = LogLevels.VERBOSE << 1;
LogLevels.ERROR   = LogLevels.WARN    << 1;
LogLevels.INFO    = LogLevels.ERROR   << 1;
LogLevels.ALL     = LogLevels.VERBOSE | LogLevels.INFO | LogLevels.WARN | LogLevels.ERROR;
LogLevels.NOTICE  = LogLevels.WARN | LogLevels.ERROR;
LogLevels.NONE    = 0;

function Logger (options) {

  var level = options.level;

  for (var key in LogLevels) {
    var l = LogLevels[key];
    if (l & level) {
      this._addLogger(key.toLowerCase());
    } else {
      this._muteLogger(key.toLowerCase());
    }
  }
}

protoclass(Logger, {
  _addLogger: function (key) {

    var fn;

    fn = console[key] || console.log;

    this[key] = function () {
      this._log(fn, key, Array.prototype.slice.call(arguments, 0));
    }
  },
  _muteLogger: function (key) {
    this[key] = function () { };
  },
  _log: function (fn, level, args) {

    args[0] = level + ": " + args[0];

    fn.apply(console, args);
  }
});

Logger.levels = LogLevels;

module.exports = Logger;