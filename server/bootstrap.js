var packages = require("packages"),
bindable     = require("bindable");

module.exports = function (config) {
	
  var pkg = packages().
  require({
    config: new bindable.Object(config)
  }).
  require(__dirname + "/packages/common").
  require(__dirname + "/packages/" + config.type).
  load();

  pkg.exports.mediator.execute("bootstrap");
}