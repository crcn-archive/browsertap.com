var mojo     = require("mojojs"),
bindableCall = require("bindable-call"),
verify       = require("verify")(),
comerr       = require("comerr");

module.exports = mojo.View.extend({

  /**
   */

  minPwLength: 5,

  /**
   */

  name: "signupView",

  /**
   */

  paper: require("./index.pc"),

  /**
   */

  bindings: {
    "signupRequest.error"   : "error",
    "signupRequest.loading" : "loading",
    "models.params.invitee" : "invitee",
    "invitee.email"         : "user.email",
  },

  /**
   */

  signup: function () {
    var self = this;

    var d = this.get("user").toJSON();
    d.inviteCode = this.get("invitee._id");

    this.set("signupRequest", bindableCall(function (next) {
      self.application.mediator.execute("signup", d, next);
    }));
  }
});