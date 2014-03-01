var glob = require("glob"),
path     = require("path"),
deepExtend = require("deep-extend");

exports.require = ["config", "express.server"];
exports.load = function (config, server) {

  var configPath = config.get("i18n.configPath"), configs = {};

  // scan the i18n directory
  glob.sync(configPath + "/**/*.json").forEach(function (cf) {
    configs[path.basename(cf).replace(/.json$/, "")] = require(cf);
  });


  server.get("/locales/:config/:locale", function (req, res) {

    // find all the requested locales
    // TODO - implement other languages
    var c = req.params.config.split("+").map(function (name) {
      return configs[name];
    }).filter(function (conf) { return !!conf; });

    // merge the locales
    var merged = deepExtend.apply(deepExtend, c);

    // return the json doc
    res.send(merged);
  });
}