var mojo = require("mojojs"),
bindable = require("bindable");

module.exports = mojo.View.extend({

  /**
   */

  paper: require("./index.pc"),

  /**
   */

  bindings: {
    "models.states.auth": "sections.pages.currentName"
  },

  /**
   */

  initialize: function () {
    mojo.View.prototype.initialize.apply(this, arguments);
    this.set("user", new bindable.Object());
  },

  /**
   */

  sections: {
    pages: {
      type: "states",
      views: [
        { class: require("./login")         , name: "login"         },
        { class: require("./forgot")        , name: "forgot"        },
        { class: require("./signup")        , name: "signup"        },
        { class: require("./requestInvite") , name: "requestInvite" }
      ]
    }
  }
});