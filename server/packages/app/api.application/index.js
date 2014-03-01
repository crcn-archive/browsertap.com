var Application = require("./application");

exports.require = ["config"];
exports.load = function (config) {
  return new Application(config);
}