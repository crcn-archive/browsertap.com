var BaseModel    = require("./base/model"),
async            = require("async"),
outcome          = require("outcome"),
request          = require("request"),
hurryup          = require("hurryup");

function Launcher () {
  BaseModel.apply(this, arguments);
  this.user = this.options.user;
}

BaseModel.extend(Launcher, {

  /**
   */

  public: ["launch"],

  /**
   */

  launch: function (complete) {

    if (!complete) complete = function () {};

    var self = this;

    var allocator = this.app.provisioner.allocateInstance({
      userId: "abcd",
      appName: this.get("appName"),
      appVersion: this.get("appVersion"),
      maxAge: -1
    }, outcome.e(complete).s(function (desktop) {
      self._onDesktop(desktop);
      complete(null, desktop);
    }));

    this.set("allocator", allocator);
  },

  /**
   */

  _onDesktop: function (desktop) {

    return; // tmp

    hurryup(function (self, next) {

      logger.info("ping %s", desktop.addresses.publicIp);

      request.post("http://" + desktop.addresses.publicIp + "/launch", {
        form: {
          appName: self.get("appName"),
          appVersion: self.get("appVersion"),
          maxAge: -1,
          address: desktop.addresses.publicIp
        }
      }, next);
      
    })(this, function(){});
  }
});

module.exports = Launcher;
