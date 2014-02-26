
var User = require("./user"),
Users    = require("./users"),
Settings = require("./settings");


var modelClasses = {
  user     : User,
  users    : Users,
  settings : Settings
};

exports.require = ["api.models.core"];
exports.load = function (models) {
  for (var name in modelClasses) {
    models.registerClass(name, modelClasses[name]);
  }
}