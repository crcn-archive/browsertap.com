var BaseModel    = require("./base/model"),
async            = require("async");


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

    if (!complete) complete = function () {}

    var allocator = this.app.provisioner.allocateInstance({
      userId: "abcd",
      appName: this.get("appName"),
      appVersion: this.get("appVersion"),
      maxAge: -1
    }, complete);

    this.set("allocator", allocator);
  }
});

module.exports = Launcher;
