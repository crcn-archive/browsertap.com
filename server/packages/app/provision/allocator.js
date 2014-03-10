var _            = require("underscore"),
async            = require("async"),
bindable         = require("bindable"),
closestEC2Region = require("closest-ec2-region"),
comerr           = require("comerr"),
outcome          = require("outcome"),
hurryup          = require("hurryup"),
request          = require("request");

/**
 */

function InstanceAllocator (options, pool) {

  bindable.Object.call(this);

  // TODO - bind max time from user object
  // to the instance allocator incase the time
  // limit increases from sharing to other people

  // the user we're assigning the instance to
  this._userId = options.userId;

  // the IP to use to find the closest EC2 region
  this._ip     = options.ip;

  this.aws     = options.aws;
  this.regions = options.aws.ec2.regions;

  this.pool    = pool;

  this.app          = options.app;
  this.appName      = options.appName;
  this.appVersion   = options.appVersion;
  this.instanceType = options.instanceType || "m3.large";

  // max age for the user. If under a trial account, we'll
  // kick the user out after N 
  this._maxAge = options.maxAge || -1;

  // when the instance is set, then ping it every once in a while to check
  // whether it's still actively being used
  this.bind("instance", { max: 1, to: _.bind(this._onInstance, this) }).now();
}

bindable.Object.extend(InstanceAllocator, {

  /**
   * assigns an instance to a user
   */

  allocate: function (complete) {

    logger.info("allocating %s@%s instance for %s", this.appName, this.appVersion, this._userId);
    var start = Date.now();


    var self = this;

    this.set("step", 0);

    // 1. find region
    // 2. allocate instance
    // 3. ping instance
    this.set("steps", 3);


    // at this point, the instance should
    // be running, and connectable
    function complete2 (err, instance) {

      // TODO - check pool
      self.set("error", err);
      self.set("instance", instance);

      if (instance) {
        self._step();
        logger.info("allocated instance in %d seconds", (Date.now() - start) / 1000);
      } else if (err) {
        logger.error(err.message);
      }

      if (complete) complete(err, instance);
    }

    var q = {};

    // make sure we can match stuff such ass
    // { firefox: "6,7,8,9,10"}
    // way easier to add tags if they're coma delimited
    q["tags." + this.appName] = new RegExp(this.appVersion);


    async.waterfall([

      /**
       */

      function getInstance (next) {
        self._getInstance(q, next);
      },

      /**
       */

      function tagInstance (instance, next) {
        instance.tags.update({ "userId": self._userId, "ready": "yes" }, outcome.e(next).s(function () {
          next(null, instance);
        }));
      },

      /**
       * try to ping the instance to make sure it's alive. Don't 
       */

      function pingInstance (instance, next) {
        self._pingInstance(instance, next);
      },


    ], complete2);

    return this;
  },

  /**
   */

  _step: function () {
    this.set("step", this.get("step") + 1);
    this.set("percentDone", (this.get("step") / this.get("steps")) * 100);
  },

  /**
   */

  _getInstance: function (q, complete) {

    var self = this, region;


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

      function findClosestRegionName (next) {

        logger.verbose("finding closest region");

        // TODO later - want to only use us-west-1 for now
        // closestEC2Region(self._ip, next);

        next(null, "us-east-1");
      },

      /**
       * find the specific region instance based on the name
       */

      function findRegion (regionName, next) {
        self._step();
        self.regions.findOne({ name: regionName }, next);
      },

      /**
       */

      function onRegion (r, next) {
        region = r;
        next()
      },

      /**
      * try to find an instance that's already assigned to the user
       */

      function findAssignedInstance (next) {
        logger.verbose("finding assigned instance");
        var search = { "tags.userId": self._userId, state: "running" };
        region.instances.findOne(_.extend(search, q), next);
      },

      /**
       * when an assigned instance is found, just return it
       */

      function onAssignedInstance (instance, next) {
        if (instance) {
          return complete(next, instance);
        }
        return next();
      },

      /**
       * if not, try to find another running instance
       * with the query specified by the user
       */

      function findRunningInstance (next) {
        logger.verbose("finding running instance");
        var search = { "tags.userId" : undefined, "tags.ready": "yes", "state": "running" };
        region.instances.findOne(_.extend(search, q), next);
      },

      /**
       */

      function onRunningInstance (instance, next) {
        if (instance) return complete(null, instance);
        next();
      },

      /**
       * If there are no running instances, try to find a stopped instance.
       * This is much faster than creating an image.
       */

      function findStoppedInstance (next) {
        logger.verbose("finding stopped instance");
        var search = { "state": "stopped" };
        region.instances.findOne(_.extend(search, q), next);
      },

      /** 
       * start the instance, then return back to the user
       */

      function onStoppedInstance (instance, next) {
        if (instance) return instance.start(next);
        next();
      },

      /** 
       * At this point, there are no more free instances, so create
       * one from the given query.
       */

      function findImage (next) {
        logger.verbose("creating instance from image");
        region.images.findOne(q, next);
      },

      /**
       * if there is an image, create an instance
       */

      function createInstance (image, next) {
        if (!image) return complete(comerr.notFound());
        image.createInstance({ type: self.instanceType }, next);
      },

      /**
       * Just incase the image is in the stopped state, start it.
       */

      function startInstance (instance, next) {
        instance.start(next);
      }

    ], complete);
  },

  /**
   */

  _pingInstance: function (instance, complete) {
    var self = this;

    function complete2 (err) {

      if (err) {
        logger.warn("instance %s not healthy. Destroying and re-allocating", instance.get("_id"));
        return self._destryAndRetryGetInstance(instance, complete);
      }

      complete(null, instance);
    }

    return complete2();

    self._step();
    logger.verbose("checking on instance health");
    instance.getStatus(complete2);
  },

  /**
   */

  _destryAndRetryGetInstance: function (instance, complete) {
    var self = this;
    async.waterfall([
      function tagNotReady (next) {
        instance.tags.update({ ready: "no" }, next);
      },
      function destroyInstance (next) {
        instance.destroy();
        self.allocate(next);
      }
    ], complete);
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

    this.get("instance").getStatus(function (err, body) {

      if (!body.timeout >= 1000 * 30) {
        return self.deallocate(comerr.timeout());
      }

      // TODO
      self._timeoutPingInstance();
    });
  }
}); 


module.exports = InstanceAllocator