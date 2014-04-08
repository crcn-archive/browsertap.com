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
    wkm: require("./wkm"),
    header: require("./header"),
    borders: require("./borders")
  },
  setScreenPosition: function (pos) {
  },
  startBorderDrag: function (pos, event) {

    var ox = event.offsetX,
    oy     = event.offsetY,
    screen = this.$(".screen"),
    self   = this,
    cbox   = {
      x: this.get("x"),
      y: this.get("y"),
      w: this.get("width"),
      h: this.get("height")
    };

    var $win = $(window);
    $win.one("mouseup", function () {
      $win.unbind("mousemove", onMouseDown);
    });

    $win.bind("mousemove", onMouseDown);

    function onMouseDown (event) {
      var nx = cbox.x, ny = cbox.y, nw = cbox.w, nh = cbox.h;

      if (/right/.test(pos)) {
        nw = event.clientX - cbox.x;
      }

      if (/left/.test(pos)) {
        nw = cbox.w + (cbox.x - event.clientX);
        nx = event.clientX;
      }

      if (/top/.test(pos)) {
        ny = event.clientY;
        nh = cbox.h + (cbox.y - event.clientY);
      }

      if (/bottom/.test(pos)) {
        nh = event.clientY - cbox.y;
      }

      self.setProperties({
        x: nx,
        y: ny,
        width: nw,
        height: nh
      });

      $(window).trigger("resize");
    }
  }
});
