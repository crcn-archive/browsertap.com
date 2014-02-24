var mojo = require("mojojs");

module.exports = mojo.View.extend({

  /**
   */

  paper: require("./index.pc"),

  /**
   */

  bindings: {
    "models.states.app": "sections.pages.currentName"
  },

  /**
   */

  sections: {
    pages: {
      type: "states",
      views: [
        { class: require("./controller"), name: "controller" }
      ]
    }
  }
});