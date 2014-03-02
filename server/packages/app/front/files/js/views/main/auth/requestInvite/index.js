var mojo     = require("mojojs"),
bindableCall = require("bindable-call");

module.exports = mojo.View.extend({

  /**
   */

  paper: require("./index.pc"),

  /**
   */

  bindings: {
    "requestInviteRequest.error"   : "error",
    "requestInviteRequest.success" : "success"
  },

  /**
   */

  requestInvite: function () {
    var self = this;
    console.log(this);
    this.set("requestInviteRequest", bindableCall(function (next) {
      self.application.mediator.execute("requestInvite", { email: self.email }, next);
    }));
  }
});
