var BaseModel = require("./model"),
outcome       = require("outcome"),
toarray       = require("toarray");

function DbModel (options, application) {
  BaseModel.apply(this, arguments);
  this.collection = application.db.collection(this.collectionName);
  this.models = application.models;
}

BaseModel.extend(DbModel, {
  
  save: function (complete) {

    var self = this;

    function _complete (err, d) {
      if (err) return complete(err);
      self.setProperties(toarray(d).shift() || {});
      complete(null, self);
    }

    if (!this.get("_id")) {
      var self = this;
      return this._create(_complete);
    } else {
      return this._update(_complete);
    }
  },
  serialize: function () {
    return this.toJSON();
  },
  remove: function (complete) {
    if (!this.get("_id")) return next(new Error("doesn't exist"));
    this._remove(complete);
  },
  _create: function (next) {
    next();
  },
  _update: function (next) {
    this.collection.update({ 
      _id: this.get("_id") 
    }, {
      $set: this.serialize()
    }, next);
  },
  _remove: function (next) {
    this.collection.remove({ _id: this.get("_id") }, next);
  }
});

module.exports = DbModel;