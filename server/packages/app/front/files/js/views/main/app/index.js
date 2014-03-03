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
  },

  /**
   */

  incCounter: function () {
    console.log("INC")
    this.get("models.user.settings").set("counter", (this.get("models.user.settings.counter") || 0) + 1);
  }
});