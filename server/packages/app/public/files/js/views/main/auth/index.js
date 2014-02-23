var mojo = require("mojojs");

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

  sections: {
    pages: {
      type: "states",
      index: 0,
      views: [
        { class: require("./login")  , name: "login"  },
        { class: require("./forgot") , name: "forgot" },
        { class: require("./signup") , name: "signup" }
      ]
    }
  }
});