var BaseCollection = require("./base/collection"),
outcome            = require("outcome"),
_                  = require("underscore");

function Launchers (user) {
  BaseCollection.apply(this, arguments);
  this.user = user;
}

BaseCollection.extend(Launchers, {

  /**
   */

  public: ["_source"],

  /**
   */

  load: function (complete) {
    var self = this;
    this.app.mediator.execute("getAvailableLaunchers", outcome.e(complete).s(function (launchers) {
      self.reset(launchers.map(_.bind(self._createModel, self)));
      complete(null, self);
    }));
  },

  /**
   */

  _createModel: function (data) {
    return this.app.models.createModel("launcher", { data: data })
  }
});

module.exports = Launchers;
