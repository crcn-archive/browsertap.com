var mojo = require("mojojs");

module.exports = mojo.View.extend({

  /**
   */

  paper: require("./index.pc"),

  /**
   */

  events: {
    "close": "close"
  },

  /**
   */

  sections: {
    pages: {
      type: "states",
      index: 0,
      views: [
        { class: require("./picker"), name: "picker" }
      ]
    }
  },

  _render: function () {
    var self = this;
    setTimeout(function () {
      self.$("#settings-inner").css({ scale: 0.95 });
      self.$("#settings-inner").transit({ scale: 1, opacity: 1, duration: 200 });
    }, 1);
    return mojo.View.prototype._render.call(this);
  },

  /**
   */

  close: function () {
    var self = this;
    this.$("#settings-inner").transit({
      opacity: 0,
      duration: 200,
      scale: 1.05
    }, function () {
      self.remove();
    });
  }
});
