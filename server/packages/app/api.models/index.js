
var modelClasses = {
  user              : require("./user"),
  users             : require("./users"),
  session           : require("./session"),
  settings          : require("./settings"),
  launcher          : require("./launcher"),
  launchers         : require("./launchers"),
  invitee           : require("./invitee"),
  resetPasswordCode : require("./resetPasswordCode")
};

exports.require = ["api.models.core"];
exports.load = function (models) {
  for (var name in modelClasses) {
    models.registerClass(name, modelClasses[name]);
  }
}