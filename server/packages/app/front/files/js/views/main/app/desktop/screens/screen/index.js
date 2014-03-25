var mojo = require("mojojs");

module.exports = mojo.View.extend({
  paper: require("./index.pc"),
  bindings: {
    "model": "screen",
    "screen": function (screen) {
      if (screen) screen.stream.start();
    }
  },
  sections: {
    wkm: require("./wkm"),
    header: require("./header"),
    border: require("./border")
  }
});
