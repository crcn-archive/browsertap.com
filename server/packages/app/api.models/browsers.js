var BaseCollection = require("./base/collection");

function Browsers (user) {
  BaseCollection.apply(this, arguments);
  this.user = user;
}

BaseCollection.extend(Browsers, {

  /**
   */

  _load: function (next) {
    this._application.mediator.execute("getAvailableBrowsers", next);
  }
});

module.exports = BaseCollection;