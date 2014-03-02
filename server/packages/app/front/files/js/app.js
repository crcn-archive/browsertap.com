var mojo = require("mojojs"),
_        = require("underscore");

function BrowserTap () {
  mojo.Application.apply(this, arguments);
  this._registerPlugins();
  var self = this;
  this.mediator.on("post bootstrap", function (message, next) {
    self._registerPostPlugins();
    next();
  });
}

mojo.Application.extend(BrowserTap, {

  /**
   */

  _registerPlugins: function () {
    this.use(require("./views"));
    this.use(require("mojo-mediator"));
    this.use(require("./template"));
    this.use(require("./hotkeys"));
    this.use(require("./commands"));
    this.use(require("./tour"));
  },

  /**
   */

  _registerPostPlugins: function () {
    this.use(require("mojo-router"));
    this.use(require("./routes"));
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

module.exports = BrowserTap