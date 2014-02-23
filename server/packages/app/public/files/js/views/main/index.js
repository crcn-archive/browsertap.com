var mojo = require("mojojs");

module.exports = mojo.View.extend({

  /**
   */

  paper: require("./index.pc"),

  /**
   */

  bindings: {
    "models.states.main": "sections.pages.currentName"
  },

  /**
   */

  sections: {
    pages: {
      type: "states",
      index: 0,
      views: [
        { class: require("./auth") , name: "auth" },
        { class: require("./app")  , name: "app"  }
      ]
    }
  }
});