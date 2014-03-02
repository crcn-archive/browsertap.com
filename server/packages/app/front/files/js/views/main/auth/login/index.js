var mojo     = require("mojojs"),
bindableCall = require("bindable-call");

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
    "loginRequest.error": "error",
    "models.users": "users"
  },

  /**
   */

  login: function () {
    var self = this;
    this.set("loginRequest", bindableCall(function (next) {
      self.application.mediator.execute("login", self.get("user").toJSON(), next);
    }));
  }
});