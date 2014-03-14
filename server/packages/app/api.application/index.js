var Application = require("./application");

exports.require = ["config", "mediator"];
exports.load = function (config, mediator) {
  
  if (config.get("inviteOnly")) {
    logger.info("Running in BETA mode");
  }

  var app = new Application(config);
  app.mediator = mediator;
  return app;
}