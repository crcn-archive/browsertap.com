var Application = require("./application");

exports.require = ["config"];
exports.load = function (config) {
  
  if (config.get("inviteOnly")) {
    logger.info("Running in BETA mode");
  }

  return new Application(config);
}