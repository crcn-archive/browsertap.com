var mojo = require("mojojs");

module.exports = mojo.View.extend({
  paper: require("./index.pc"),
  bindings: {
    "models.desktop": "desktop"
  },
  sections: {
    screens: require("./screens")
  }
});
