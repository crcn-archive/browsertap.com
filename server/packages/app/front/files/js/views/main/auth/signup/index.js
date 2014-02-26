var mojo     = require("mojojs"),
bindableCall = require("bindable-call");

module.exports = mojo.View.extend({

  /**
   */

  paper: require("./index.pc"),

  /**
   */

  bindings: {
    "signupRequest.error": "error",
    "models.users": "users"
  },

  /**
   */

  signup: function () {
    var self = this;

    var d = this.get("user").toJSON();

    if (!d.email || !d.confirmPassword || !d.password) {
      return this.set("error", new Error("Please fill in all fields."));
    }

    if (d.confirmPassword != d.password) {
      return this.set("error", new Error("Please make sure your password match."));
    }

    this.set("error", undefined);

    this.set("signupRequest", bindableCall(function (next) {
      self.application.mediator.execute("signup", d, next);
    }));
  }
});