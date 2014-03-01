var mojo     = require("mojojs"),
bindableCall = require("bindable-call"),
_ = require("underscore");

module.exports = mojo.View.extend({

  /**
   */

  paper: require("./index.pc"),

  /**
   */

  bindings: {
    "models.params.code": "code",
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
      self.application.mediator.execute("resetPassword", _.extend({ code: self.get("code") }, self.get("user").toJSON()), next);
    }));
  }
});