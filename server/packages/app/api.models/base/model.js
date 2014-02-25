var bindable = require("bindable");

function BaseModel (data, application) {
  bindable.Object.apply(this, arguments);
  this._application = application;
  this._db = application.db;
}

bindable.Object.extend({
  
});

module.exports = BaseModel;