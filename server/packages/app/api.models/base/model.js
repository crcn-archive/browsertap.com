var bindable = require("bindable"),
janitor      = require("janitorjs"),
Future       = require("fibers/future"),
_            = require("underscore");

function BaseModel (options, application) {
  bindable.Object.call(this, options.data || {});
  this.app = application;
  this.options = options;
  this._janitor = janitor();
  application.utils.fiberize(this);
}

bindable.Object.extend(BaseModel, {
  private: ["application"],
  public: ["bind", "set", "get", "on", "once", "off", "emit"],
  fiberize: [],
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