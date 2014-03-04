var deepExtend = require("deep-extend"),
config         = require("./config"),
bootstrap      = require("./bootstrap"),
Logger         = require("./logger");

/**
 */

module.exports = function (ops, next) {

  var c = config(ops);


  var conf = deepExtend(c.default, c[ops.env] || c.development);

  global.logger = new Logger({ level: ops.logLevel || conf.logLevel });
  bootstrap(conf, next);
};
