var mojo = require("mojojs");

module.exports = mojo.View.extend({

  /**
   */

  paper: require("./index.pc"),

  /**
   */

  bindings: {
    "models.states.forgot": "sections.pages.currentName"
  },

  /**
   */

  sections: {
    pages: {
      type: "states",
      views: [
        { class: require("./form")      , name: "form"      },
        { class: require("./reset")     , name: "reset"     }
      ]
    }
  }
});