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
      to: "position"
    }
  },

  /**
   */

  move: function () {
    this.set("models.user.settings.menuPosition", (this.get("models.user.settings.menuPosition") + 1) % 4);
  }
});