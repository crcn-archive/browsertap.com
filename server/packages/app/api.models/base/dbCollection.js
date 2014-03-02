var BaseCollection = require("./collection"),
_                  = require("underscore"),
comerr             = require("comerr");

function DbCollection (options, application) {
  BaseCollection.apply(this, arguments);
  this.models = application.models;
}

BaseCollection.extend(DbCollection, {
  find: function (query, options, complete) {
    this.models.find.apply(this.models, [this.modelName].concat(Array.prototype.slice.call(arguments, 0)));
  },
  findOne: function (query, options, complete) {
    this.models.findOne.apply(this.models, [this.modelName].concat(Array.prototype.slice.call(arguments, 0)));
  }
});

module.exports = DbCollection;