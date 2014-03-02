var mojo     = require("mojojs"),
bindableCall = require("bindable-call");

module.exports = mojo.View.extend({

  /**
   */

  name: "signupView",

  /**
   */

  paper: require("./index.pc"),

  /**
   */

  bindings: {
    "signupRequest.error": "error"
  },

  /**
   */

  signup: function () {
    var self = this;

    var d = this.get("user").toJSON();

    this.set("signupRequest", bindableCall(function (next) {
      self.application.mediator.execute("signup", d, next);
    }));
  }
});