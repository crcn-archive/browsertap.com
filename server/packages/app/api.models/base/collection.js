var Collection = require("bindable").Collection;

function BaseCollection () {
  Collection.call(this);
}

Collection.extend(BaseCollection, {
  private: ["application"],
  public: ["bind", "set", "get", "on", "once", "off", "emit"]
});

module.exports = BaseCollection;