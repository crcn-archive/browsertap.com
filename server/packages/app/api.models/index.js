
var User = require("./user"),
Users    = require("./users"),
Browser  = require("./browser")
Browsers = require("./browsers"),
Settings = require("./settings");


var modelClasses = {
  user     : User,
  users    : Users,
  browser  : Browser,
  browsers : Browsers,
  settings : Settings
};

exports.require = ["api.models.core"];
exports.load = function (models) {

  return;


  for (var name in modelClasses) {
    models.registerClass(name, modelClasses[name]);
  }
}