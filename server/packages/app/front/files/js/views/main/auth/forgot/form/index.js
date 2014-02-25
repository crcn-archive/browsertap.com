var mojo     = require("mojojs"),
bindableCall = require("bindable-call");

module.exports = mojo.View.extend({

  /**
   */

  paper: require("./index.pc"),

  
  /**
   */

  bindings: {
    "resetPasswordRequest.error": "error",
    "models.users": "users",
    "resetPasswordRequest.success": function (v) {
      if (!v) return;
      this.application.router.redirect("home");
    }
  },

  
  /**
   */

  resetPassword: function () {
    var self = this;
    this.set("resetPasswordRequest", bindableCall(function (next) {
      self.users.sendResetPasswordEmail(self.get("user").toJSON(), next);
    }));
  }
});