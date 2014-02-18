var packages = require("packages"),
bindable     = require("bindable");

module.exports = function (config) {
    packages().
    require({
      config: new bindable.Object(config)
    }).
    require(__dirname + "/packages").
    load();
}