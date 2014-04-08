var mojo = require("mojojs");

module.exports = mojo.View.extend({
  paper: require("./index.pc"),
  x: 0,
  y: 0,
  bindings: {
    "model": "screen",
    "screen": function (screen) {
      if (screen) screen.stream.start();
    },
    "screen.style": {
      "maximize": {
        "map": function (style) {
          if (!style) return false;
          return false;
          return Boolean(style.minimizebox && style.maximizebox && style.sysmenu && style.visible);
        }
      }
    },
    "screen.width": {
      max: 1,
      to: "width"
    },
    "screen.height": {
      max: 1,
      to: "height"
    }
  },
  sections: {
    wkm: require("./wkm")
  },
  setScreenPosition: function (pos) {
  }
});
