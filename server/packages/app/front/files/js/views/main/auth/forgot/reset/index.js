var mojo     = require("mojojs"),
bindableCall = require("bindable-call"),
_            = require("underscore");

module.exports = mojo.View.extend({

  /**
   */

  minPwLength: 5,

  /**
   */

  name: "resetPasswordView",

  /**
   */

  paper: require("./index.pc"),

  /**
   */

  bindings: {
    "models.params.code"           : "code",
    "resetPasswordRequest.error"   : "error",
    "resetPasswordRequest.loading" : "loading"
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