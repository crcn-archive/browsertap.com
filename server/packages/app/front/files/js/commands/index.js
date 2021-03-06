var commands = [
  require("./load/dnode"),
  require("./load/dom"),
  require("./load/i18n"),
  require("./load/session"),
  require("./api"),
  require("./popup")
];

module.exports = function (app) {
  for (var i = commands.length; i--;) {
    var command = commands[i]
    for (var name in command) {
      app.mediator.on(name, command[name]);
    }
  }
}
