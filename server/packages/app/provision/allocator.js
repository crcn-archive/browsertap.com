var _            = require("underscore"),
async            = require("async"),
bindable         = require("bindable"),
closestEC2Region = require("closest-ec2-region"),
comerr           = require("comerr");

/**
 */

function InstanceAllocator (options, pool) {

  // TODO - bind max time from user object
  // to the instance allocator incase the time
  // limit increases from sharing to other people

  // the user we're assigning the instance to
  this._userId = options.userId;

  // the IP to use to find the closest EC2 region
  this._ip     = options.ip;

  this.aws     = options.aws;

  this.pool    = pool;

  this.app          = options.app;
  this.appName      = options.appName;
  this.appVersion   = options.appVersion;
  this.instanceType = options.instanceType || "m3.large";

  // max age for the user. If under a trial account, we'll
  // kick the user out after N 
  this._maxAge = options.maxAge || -1;

  this.allocate();

  // when the instance is set, then ping it every once in a while to check
  // whether it's still actively being used
  self.bind("instance", { max: 1, to: _.bind(this._onInstance, this) }).now();
}

bindable.Object.extend(InstanceAllocator, {

  /**
   * assigns an instance to a user
   */

  allocate: function () {


    var self = this;


    // at this point, the instance should
    // be running, and connectable
    function complete (err, instance) {

      // TODO - check pool
      self.set("error", err);
      self.set("instance", instance);
    }

    var q = {};

    // make sure we can match stuff such ass
    // { firefox: "6,7,8,9,10"}
    // way easier to add tags if they're coma delimited
    q["tags." + this.appName] = new RegExp(this.appVersion);

    async.waterfall([

      /**
       */

      function validate (next) {
        if (self.maxAge <= 0) {
          return complete(comerr.unauthorized("cannot allocate instance"))
        }
        next();
      },

      /**
       * first find the closest EC2 region based on the IP 
       * address of the specific user. THis reduces latency
       * and ultimately improves the UX of the application
       */

      function findClosestRegionName () {

        // TODO later - want to only use us-west-1 for now
        // closestEC2Region(self._ip, next);

        next(null, "us-west-1");
      },

      /**
       * find the specific region instance based on the name
       */

      function findRegion (regionName, next) {
        self.regions.findOne({ name: regionName }, next);
      },

      /**
       * once the region is found (there's NO 404), then
       * find a free instance that has been used by a user.
       * This is a LOT faster than creating a pristine image each time.
       */

      function findFreeInstance (region, next) {
        var search = { "userId" : self._userId };
        region.instances.find(_.extend(search, q), next);
      },

      /**
       * if there's a free instance based on the given query, return
       * it back to the user
       */

      function onFreeInstance (instance, next) {
        if (instance) return instance.start(complete);
        next();
      },

      /** 
       * At this point, there are no more free instances, so create
       * one from the given query.
       */

      function findImage (next) {
        self.images.findOne(q, next);
      },

      /**
       * if there is an image, create an instance
       */

      function createInstance (image, next) {
        if (!image) return complete(comerr.notFound());
        image.createInstance({ type: self.instanceType }, next);
      },

      /**
       * start the instance
       */

      function onInstance (instance, next) {
        instance.start(next);
      },

      /**
       * ping the instance
       */

      function pingInstance (instance, next) {
        next();
      }
    ], complete);

    return this;
  },

  /**
   * checks the instance to see if it's still being used
   */

  tryDeallocating: function () {

  },

  /**
   */

  _outOfTime: function () {
    this.deallocate(comerr.expired());
  },

  /**
   * takes the free instance out of the pool
   */

  deallocate: function (err) {
    if (err) this.set("error", err);
    this.get("instance")
  },

  /**
   * checks the instance to see
   */

  _onInstance: function (instance) {
    this._timeoutPingInstance();
    this._startCountdown();
  },

  /**
   */

  _timeoutPingInstance: function () {
    setTimeout(_.bind(this._checkInstanceActivity, this), 1000 * 30);
  },

  /**
   */

  _startCountdown: function () {

    // max time for the the session? set the timer, then destroy
    // the instance immediately
    if (~!this._maxAge) {
      setTimeout(_.bind(this._outOfTime, this), this._maxAge);
    }
  },

  /**
   */

  _checkInstanceActivity: function () {

    var self = this;
    request(this.get("instance.addresses.publicDNS") + "/status", function (err, res, body) {

      if (!body.timeout >= 1000 * 30) {
        return self.deallocate(comerr.timeout());
      }

      // TODO
      self._timeoutPingInstance();
    });
  }
}); 