var protoclass = require("protoclass"),
async          = require("async"),
memoize        = require("memoizee"),
_              = require("underscore"),
request        = require("request");

function InstancePool (aws) {
  this.aws = aws;
  setTimeout(_.bind(this._removeInstances, this), 1000 * 10);
}

protoclass(InstancePool, {

  /**
   */

  getInstance: function (options, instance) {

    var q = {};

    // looking for tags such as { firefox: "6,7,8,9,10" }
    q["tags." + options.browserName] = new RegExp(options.browserVersion);

    var self = this;
    async.waterfall([

      /**
       * find the region based on the IP address
       */

      function findRegion (next) {

      }

      /**
       * first find a free instance that's not being used
       */

      function findFreeInstance (next) {
        self.aws.instances.find(_.extend({ "tags.user": undefined }, q), this);
      },

      /**
       * if there is a free instance, then return it back to the user
       */

      function onFreeInstance (instance, next) {
        if (instance) return complete(null, instance);
        next();
      },

      /**
       * no free instance? create one
       */

      function createInstance (next) {

      }
    ])
  },

  /**
   * takes instances out that have been sitting for a while
   */

  _removeInstances: function () {
    // ping instances to see if there's anyone connected to them
  }
});

module.exports = InstancePool;