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
  sections: {

    // windows / keyboard / mouse controller. This thing is full screen
    wkm: require("./wkm")
  }
});
