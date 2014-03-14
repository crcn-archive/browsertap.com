var mojo = require("mojojs");

module.exports = mojo.View.extend({
  paper: require("./index.pc"),
  bindings: {
    "models.user.launchers": "launchers"
  },
  sections: {
    launchers: {
      type: "list",
      source: "launchers",
      modelViewClass: require("./launcher")
    }
  }
});
