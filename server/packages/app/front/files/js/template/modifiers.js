var pc = require("paperclip");

module.exports = function (app) {

  var modifiers = {
    redirect: function (location) {
      app.router.redirect(location);
    },
    t: function (string, params) {
      return app.i18n.t(string, params);
    }
  };

  for (name in modifiers) pc.modifier(name, modifiers[name]);
}