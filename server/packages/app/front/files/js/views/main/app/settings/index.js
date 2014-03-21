var mojo = require("mojojs");

module.exports = mojo.View.extend({

  /**
   */

  paper: require("./index.pc"),

  /**
   */

  sections: {
    pages: {
      type: "states",
      index: 0,
      views: [
        { class: require("./picker"), name: "picker" }
      ]
    }
  }
});
