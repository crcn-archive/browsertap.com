var InstanceAllocator = require("./allocator"),
InstancePool          = require("./pool"),
_                     = require("underscore"),
desktopDecor          = require("./decor/desktop");



/**
 * connection between the provisioner and the application
 */

exports.require = ["aws", "config", "api.application"];
exports.load = function (aws, config, app) {


  aws.use(desktopDecor);

  var pool = new InstancePool({}).start();

  var provisioner = {
    allocateInstance: function (options, complete) {
      return new InstanceAllocator(_.extend({
        aws: aws,
        config: config,
      }, options), pool).allocate(complete);
    }
  }

  app.provisioner = provisioner;
}
