var protoclass = require("protoclass"),
async          = require("async");


// creates a reserve of instances on standby
function InstancePool (options) {
  this.min = options.min || 0;
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
    async.waterfall([
    ], complete);
  }
});

module.exports = InstancePool;