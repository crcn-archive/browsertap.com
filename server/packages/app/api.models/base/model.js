var bindable = require("bindable"),
janitor      = require("janitorjs");

function BaseModel (options, application) {
  bindable.Object.call(this, options.data || {});
  this.app = application;
  this._janitor = janitor();
}

bindable.Object.extend(BaseModel, {
  private: ["application"],
  public: ["bind", "set", "get", "on", "once", "off", "emit"],
  disposable: function (item) {
    this._janitor.add(item);
    return item;
  },
  dispose: function () {
    BaseModel.parent.prototype.dispose.call(this);
    this._janitor.dispose();
  }
});

module.exports = BaseModel;