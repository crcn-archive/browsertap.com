var protoclass = require("protoclass");

function Models (application) {
  this._modelClasses = {};
  this.application = application;
}

protoclass(Models, {

  /**
   */

  registerClass: function (name, modelClass) {
    this._modelClasses[name] = modelClass;
  },

  /**
   */

  createModel: function (name, options) {
    var modelClass = this._modelClasses[name];
    return new modelClass(options, this.application);
  },

  /**
   */

  find: function (modelName, query, options, next) {

    if (arguments.length === 3) {
      next = options;
      options = {};
    }

    this.createModel(modelName, {

      // db query
      query   : query,

      // additional options - skip, sort, etc.
      options : options
    }).load(next);
  }
});

module.exports = Models;