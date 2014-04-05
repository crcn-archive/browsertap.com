var mojo = require("mojojs");

module.exports = mojo.View.extend({
  paper: require("./index.pc"),
  bindings: {
    "model.selected": "selected"
  }
})
