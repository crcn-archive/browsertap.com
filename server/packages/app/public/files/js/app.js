var mojo = require("mojojs");

function BrowserTap () {
  mojo.Application.apply(this, arguments);
  this._registerPlugins();
}

mojo.Application.extend(BrowserTap, {

  /**
   */

  _registerPlugins: function () {
    this.use(require("./views"));
    this.use(require("mojo-router"));
    this.use(require("./routes"));
  },

  /**
   */

  initialize: function (placeholder) {
    this.createView("main").attach(placeholder);
  }
});

module.exports = BrowserTap;