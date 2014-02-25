var pc = require("paperclip");

module.exports = function (app) {

  var modifiers = {
    redirect: function (location) {
      app.router.redirect(location);
    }
  };

  for (name in modifiers) pc.modifier(name, modifiers[name]);
}