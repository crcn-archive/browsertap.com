var bindable = require("bindable"),
glob         = require("glob"),
path         = require("path");

exports.require = ["paperclip.plugins.layout"];
exports.load = function (layouts) {

  glob.sync(__dirname + "/layouts/*.pc").forEach(function (layoutPath) {
    layouts.set(path.basename(layoutPath).split(".").shift(), require(layoutPath));
  });

  return new bindable.Object({
    main: require("./main")
  });
};