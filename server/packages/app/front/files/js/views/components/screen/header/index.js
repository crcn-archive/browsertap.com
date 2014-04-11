var mojo = require("mojojs");

module.exports = mojo.View.extend({
  paper: require("./index.pc"),
  startDragHeader: function (event) {

    if (this.get("maximize")) return;

    this.call("focus");

    var ox = event.offsetX,
    oy     = event.offsetY,
    self = this;

    function onMouseMove (event) {
        self.parent.setProperties({
          y: event.clientY - oy,
          x: event.clientX - ox
        });
    }

    $(window).bind("mousemove", onMouseMove);
    $(window).one("mouseup", function () {
      $(window).unbind("mousemove", onMouseMove);
    })
  }
});
