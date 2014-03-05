var mojo = require("mojojs");

module.exports = mojo.View.extend({



  position: 0,

  /**
   */

  paper: require("./index.pc"),

  /**
   */

  bindings: {
    "models.user.settings.menuPosition": {
      bothWays: true,
      to: "position"
    }
  },

  /**
   */

  move: function () {
    this.set("position", (this.get("position") + 1) % 4);
  }
});