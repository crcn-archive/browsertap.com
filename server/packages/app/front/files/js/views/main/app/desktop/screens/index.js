var mojo = require("mojojs");

module.exports = mojo.View.extend({
  paper: require("./index.pc"),
  sections: {
    screens: {
      type: "list",
      source: "desktop.screens",
      modelViewClass: require("./screen")
    }
  }
});
