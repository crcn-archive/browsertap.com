var protoclass = require("protoclass"),
async          = require("async"),
_              = require("underscore"),
request        = require("request");


// creates a reserve of instances on standby
function InstancePool (options) {
  this.minRunning = options.minRunning || 0;
  this.minStopped = options.minStopped || 10;
  this.aws = options.aws;
}

protoclass(InstancePool, {

  /**
   */

  start: function () {
    if (this._started) return this;
    this._started = true;
    this.check();
    return this;
  },

  /**
   */

  checkTimeout: function () {
    this._checkTimeout = setTimeout(_.bind(this.check, this), 1000 * 10);
  },

  /**
   */

  check: function () {
    var self = this;

    clearTimeout(this._checkTimeout);

    // allocate instance
    this.allocate(function () {
      self.deallocate(function () {
        self.checkTimeout();
      });
    })
  },

  /**
   * allocate instances on min run count
   */

  allocate: function (complete) {
    async.waterfall([
    ], complete);
  },

  /**
   */

  deallocate: function (complete) {
    var self = this;
    return;
    async.waterfall([
      function findAllInstances () {
        self.aws.ec2.regions.instances.find({ "tags.name": "desktop" }, next);
      },
      function deallocateInstances (instances, next) {
        async.forEach(instances, _.bind(self._tryDeallocatingInstance, self), next);
      }
    ], complete);
  },

  /**
   */

  _tryDeallocatingInstance: function (instance, next) {

  }
});

module.exports = InstancePool;