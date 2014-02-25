var commands = [
  require("./load/dnode"),
  require("./load/dom")
];

module.exports = function (app) {
  for (var i = commands.length; i--;) {
    var command = commands[i]
    for (var name in command) {
      app.mediator.on(name, command[name]);
    }
  }
}