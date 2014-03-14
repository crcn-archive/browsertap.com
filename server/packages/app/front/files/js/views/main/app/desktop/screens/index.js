var mojo = require("mojojs");

module.exports = mojo.View.extend({
  paper: require("./index.pc"),
  bindings: {
    "models.desktop.screens": "screens"
  },
  sections: {
    screens: {
      type: "list",
      source: "screens",
      modelViewClass: require("./screen")
    }
  }
})