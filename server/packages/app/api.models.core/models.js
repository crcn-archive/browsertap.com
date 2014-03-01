var protoclass = require("protoclass"),
factories      = require("factories"),
comerr         = require("comerr"),
traverse       = require("traverse"),
ObjectID       = require("mongodb").ObjectID;

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

  findOne: function (modelName, query) {
    return this._query.apply(this, ["findOne"].concat(Array.prototype.slice.call(arguments, 0)));
  },

  /**
   */

  find: function (modelName, query) {
    return this._query.apply(this, ["find"].concat(Array.prototype.slice.call(arguments, 0)));
  },

  /**
   */

  _query: function (method, modelName) {
    var args = Array.prototype.slice.call(arguments, 0);
    var methodName = args.shift(),
    modelName = args.shift();

    var modelClass = this._modelClasses[modelName];
    var collection     = this.application.db.collection(modelClass.prototype.collectionName);

    args.push(this._mapComplete(modelName, args.pop()));

    args[0] = traverse(args[0]).forEach(function (x) {
      if (x && x.$oid) {
        this.update(new ObjectID(String(x.$oid)));
        this.stop();
      }
    });

    collection[methodName].apply(collection, args);
  },

  /**
   */

  createModel: function (name, options) {
    var modelClass = this._modelClasses[name];
    return new modelClass(options, this.application);
  },


  _mapComplete: function (modelName, complete) {
    var self = this;

    function _createModel (item) {
      return self.createModel(modelName, { data: item });
    }

    return function (err, items) {
      console.log(arguments);
      if (err) return complete(err);


      if (!items) {
        return complete(comerr.notFound());
      } else if (items.map) {
        items = items.map(_createModel);
      } else if(items) {
        items = _createModel(items);
      }

      complete(null, items);
    }
  }
});

module.exports = Models;