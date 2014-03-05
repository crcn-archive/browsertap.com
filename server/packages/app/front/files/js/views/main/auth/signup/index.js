var mojo     = require("mojojs"),
bindableCall = require("bindable-call"),
verify       = require("verify")(),
comerr       = require("comerr");

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
    "signupRequest.error"   : "error",
    "models.params.invitee" : "invitee",
    "invitee.email"         : "user.email",

    "user.name": {
      "nameOk": {
        "map": function (v) {
          return !!v;
        }
      }
    },

    "user.email": {
      "emailOk": {
        "map": function (v) {
          return verify.that({ email: v}).has("email").success;
        }
      }
    },

    "user.confirmPassword, user.password": {
      "confirmPasswordOk": {
        "map": function (a, b) {
          return a == b;
        }
      }
    },

    "nameOk, emailOk, confirmPasswordOk": {
      "formOk": {
        "map": function (a, b, c) {
          return a && b && c;
        }
      }
    }
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