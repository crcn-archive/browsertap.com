var packages = require("packages"),
bindable     = require("bindable"),
Fibers       = require("fibers");

/**
 */

module.exports = function (config, next) {

  if (!next) next = function () { };

  logger.info("starting %s in %s mode", config.type, config.env);
	
  var pkg = packages().
  require({
    config: new bindable.Object(config)
  }).
  require(__dirname + "/packages/common").
  require(__dirname + "/packages/" + config.type).
  load();

  pkg.exports.mediator.execute("bootstrap", function () {

    logger.info("successfuly started");

    function _next () {
      next(null, pkg.exports);
    }

    if (config.fibers) {
      Fibers(_next).run();
    } else {
      _next();
    }
  });
};
