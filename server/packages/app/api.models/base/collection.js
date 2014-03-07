var Collection = require("bindable").Collection;

function BaseCollection (options, application) {
  Collection.call(this);
  this.app = application;
  this.options = options || {};
  application.utils.fiberize(this);
}

Collection.extend(BaseCollection, {
  private: ["application"],
  public: ["bind", "set", "get", "on", "once", "off", "emit", "__isBindable", "__isBindableCollection", "_source"]
});

module.exports = BaseCollection;