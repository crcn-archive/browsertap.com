var deepExtend = require("deep-extend"),
config         = require("./config"),
bootstrap      = require("./bootstrap");

/**
 */

module.exports = function (ops, next) {

  var c = config(ops);

  var conf = deepExtend(c.default, c[ops.env] || c.development);
  bootstrap(conf, next);
};
