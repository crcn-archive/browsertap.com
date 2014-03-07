var dnode = require("dnode"),
shoe      = require("shoe");

exports.require = ["mediator", "api.models.core"]
exports.load = function (mediator, models) {
  mediator.on("getDNodeObject", function (message, next) {
    next(null, models.createModel("users", { stream: message.data }));
  });
}