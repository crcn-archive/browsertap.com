var InstanceAllocator = require("./allocator"),
InstancePool          = require("./pool");

/**
 * connection between the provisioner and the application
 */

exports.load = function () {
  
  var pool = new InstancePool({}).start();
  
  return function (options) {
    return new InstanceAllocator(options, pool).allocate();
  }
}