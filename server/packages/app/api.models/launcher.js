var BaseModel    = require("./base/model"),
async            = require("async"),
closestEC2Region = require("closest-ec2-region")();

closestEC2Region("54.84.220.75", function (err, regionName) {
  console.log(regionName);
})

function Launcher () {
  BaseModel.apply(this, arguments);
  this.user = this.options.user;
}

BaseModel.extend(Launcher, {

  /**
   */

  deserialize: function (data) {
    return {
      os             : data.os,
      browserName    : data.name,
      browserVersion : data.version,
      status         : data.status
    }
  },

  /**
   */

  launch: function (next) {

    var self = this;

    async.waterfall([

      function foind (next) {
        closestEC2Region(self.user.remoteAddress, function (err, regionName) {
          next(null, regionName || "us-east-1");
        })
      },

      function allocateInstance (regionName, next) {
        // fetch from pool
        // this.application.instancePool.allocate(regionName, )
      },


    ]);
  }
});

module.exports = Launcher;