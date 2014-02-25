var bindable = require("bindable");

function BaseModel (options, application) {
  bindable.Object.apply(this, options.data || {});
  this.application = application;
}

bindable.Object.extend(BaseModel, {
  private: ["application"],
  public: ["bind", "set", "get", "on", "once", "off", "emit"]
});

module.exports = BaseModel;