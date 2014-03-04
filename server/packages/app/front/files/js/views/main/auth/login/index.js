var mojo     = require("mojojs"),
bindableCall = require("bindable-call"),
secretKey = require("../../../../security/secretKey");

module.exports = mojo.View.extend({

  /**
   */

  name: "LoginView",

  /**
   */

  paper: require("./index.pc"),

  /**
   */

  bindings: {
    "loginRequest.error": "error"
  },

  /**
   */

  login: function () {
    var self = this;

    var d = self.get("user").toJSON();
    d.secret = secretKey.generate();

    this.set("loginRequest", bindableCall(function (next) {
      self.application.mediator.execute("login", d, next);
    }));
  }
});