var mojo = require("mojojs");

module.exports = mojo.View.extend({

  /**
   */

  paper: require("./index.pc"),


  /**
   */

  sections: {
    pages: {
      type: "states",
      index: 0,
      views: [
        { class : require("./main"),        name: "main"        },
        { class : require("./extensions"),  name: "extensions"  },
        { class : require("./quality"),     name: "quality"     },
        { class : require("./payments") ,   name: "payments"    },
        { class : require("./setupTunnel"), name: "setupTunnel" }
      ]
    }
  }
});