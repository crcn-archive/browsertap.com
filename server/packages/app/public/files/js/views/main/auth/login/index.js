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
    "loginRequest.success": function () {
      this.application.router.redirect("home");
    }
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