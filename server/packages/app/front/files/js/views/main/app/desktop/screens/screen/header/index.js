var mojo = require("mojojs");

module.exports = mojo.View.extend({
  paper: require("./index.pc"),
  startDragHeader: function (event) {

    var ox = event.offsetX,
    oy     = event.offsetY,
    self = this;

    function onMouseMove (event) {
        self.parent.setProperties({
          top: event.clientY - oy,
          left: event.clientX - ox
        });
    }

    $(window).bind("mousemove", onMouseMove);
    $(window).one("mouseup", function () {
      $(window).unbind("mousemove", onMouseMove);
    })
  }
});
