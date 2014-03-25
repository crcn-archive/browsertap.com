var mojo = require("mojojs");

module.exports = mojo.View.extend({
  paper: require("./index.pc"),
  bindings: {
    "model": "screen",
    "screen": function (screen) {
      if (screen) screen.stream.start();
    },
    "screen.style": {
      "maximize": {
        "map": function (style) {
          if (!style) return false;
          return Boolean(style.minimizebox && style.maximizebox && style.sysmenu && style.visible);
        }
      }
    }
  },
  sections: {
    wkm: require("./wkm"),
    header: require("./header"),
    border: require("./border")
  }
});
