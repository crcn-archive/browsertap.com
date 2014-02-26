
var modelClasses = {
  user      : require("./user"),
  users     : require("./users"),
  settings  : require("./settings"),
  launcher  : require("./launcher"),
  launchers : require("./launchers")
};

exports.require = ["api.models.core"];
exports.load = function (models) {
  for (var name in modelClasses) {
    models.registerClass(name, modelClasses[name]);
  }
}