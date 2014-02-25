var Models = require("./models");

exports.require = ["api.application"];
exports.load = function (application) {
  var models = new Models(application);
  application.models = models;
  return models;
}