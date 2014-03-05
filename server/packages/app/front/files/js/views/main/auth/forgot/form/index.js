var mojo     = require("mojojs"),
bindableCall = require("bindable-call");

module.exports = mojo.View.extend({

  /**
   */

  name: "forgotFormView",

  /**
   */

  paper: require("./index.pc"),
  
  /**
   */

  bindings: {
    "resetPasswordRequest.error"   : "error",
    "resetPasswordRequest.loading" : "loading"
  },

  /**
   */

  resetPassword: function () {
    var self = this;
    this.set("resetPasswordRequest", bindableCall(function (next) {
      self.application.mediator.execute("sendResetPasswordEmail", self.get("user").toJSON(), next);
    }));
  }
});