var request = require("superagent"),
bindable    = require("bindable");

module.exports = {
  "pre bootstrap": function (message, next) {

    var app = message.mediator.application;

    if (!process.browser) {
      app.i18n = {
        t: function (string, params) {
          return string
        }
      };
      
      return next();
    }

    request.get("/locales/app/en.json").end(function (err, res) {
      // var translations = new bindable.Object()

      if (err) {
        return next(err);
      }

      var t = new bindable.Object(res.body);

      app.i18n = {
        t: function (string, params) {

          if (!params) params = {};

          var translation = t.get(string) || string;

          for (var name in params) {
            translation = translation.replace("__" + name + "__", params[name]);
          }

          return translation;
        }
      }

      next();
    });
  }
}