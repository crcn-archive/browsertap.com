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
    this.use(require("mojo-mediator"));
    this.use(require("./routes"));
    this.use(require("./template/modifiers"));
    this.use(require("./hotkeys"));
    this.use(require("./commands"));
    this.use(require("./tour"));
  },

  /**
   */

  initialize: function (placeholder, next) {
    var self = this;
    this.mediator.execute("bootstrap", function () {
      self.mainView = self.createView("main").attach(placeholder);
    });
  }
});

module.exports = BrowserTap;