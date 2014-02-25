var mojo     = require("mojojs"),
bindableCall = require("bindable-call");

module.exports = mojo.View.extend({

  /**
   */

  paper: require("./index.pc"),

  /**
   */

  bindings: {
    "loginRequest.error": "error",
    "models.users": "users",
    "loginRequest.success": function (value) {
      if (!value) return;
      this.application.router.redirect("home");
    }
  },

  /**
   */

  login: function () {
    var self = this;
    this.set("loginRequest", bindableCall(function (next) {
      self.users.login(self.get("user").toJSON(), next);
    }));
  }
});