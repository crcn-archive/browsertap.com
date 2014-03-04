var store = require("store"),
secretKey = require("../../security/secretKey");


module.exports = {
  "bootstrap": function (message, next) {
    var app = message.mediator.application;
    if (!process.browser) return next();

    var sessid = store.get("sessid");

    if (sessid) {
      app.models.get("users").getSession(secretKey.get(), sessid, function (err, session) {
        if (!session) return next();
        session.bind("user", { max: 1, to: function (user) {
          app.models.set("user", user);
          next();
        }}).now();
      });
    } else {
      next();
    }

    app.bind("models.user.session._id", { to: function (v) {
      store.set("sessid", v);
    }}).now();
  }
}