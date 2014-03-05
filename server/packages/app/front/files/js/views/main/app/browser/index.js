var mojo = require("mojojs");

module.exports = mojo.View.extend({

  /**
   */

  paper: require("./index.pc"),

  /**
   */

  sections: {
    menu     : require("./menu"),
    settings : require("./settings"),
    screen   : require("./screen")
  }
});