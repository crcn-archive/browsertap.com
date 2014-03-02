var Collection = require("bindable").Collection;

function BaseCollection (options, application) {
  Collection.call(this);
  this.app = application;
  application.utils.fiberize(this);
}

Collection.extend(BaseCollection, {
  private: ["application"],
  public: ["bind", "set", "get", "on", "once", "off", "emit"]
});

module.exports = BaseCollection;