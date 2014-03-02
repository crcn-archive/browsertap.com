var bindable = require("bindable"),
janitor      = require("janitorjs"),
_            = require("underscore"),
toarray      = require("toarray");

function BaseModel (options, application) {
  bindable.Object.call(this, options.data || {});
  this.app = application;
  this.options = options;
  this._janitor = janitor();
  application.utils.fiberize(this);
  this._setupVirtuals();
}

bindable.Object.extend(BaseModel, {

  /**
   */
   
  private: ["application"],

  /**
   */
   
  public: ["bind", "set", "get", "on", "once", "off", "emit", "__isBindable", "__context"],

  /**
   */
   
  fiberize: [],

  /**
   */
   
  disposable: function (item) {
    this._janitor.add(item);
    return item;
  },
  /**
   */
   
  dispose: function () {
    BaseModel.parent.prototype.dispose.call(this);
    this._janitor.dispose();
  },

  /**
   */

  _setupVirtuals: function () {
    var virtuals = this.virtuals;
    if (!virtuals) return;
    this.on("watching", _.bind(this._bindVirtual, this));
  },

  /**
   */

  _bindVirtual: function (path) {
    var virtual, v, self = this;
    if (!(virtual = this.virtuals[path[0]])) return;
    if (!/undefined|string/.test(typeof (v = this.get(path))) && String(v).length !== 24) return;

    virtual.call(this, function (err, item) {
      if (err) return;
      self.set(path, item);
    });
  } 
});

module.exports = BaseModel;