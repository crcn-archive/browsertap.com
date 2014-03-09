var InstanceAllocator = require("./allocator");

/**
 * connection between the provisioner and the application
 */

exports.load = function () {
  return function (options) {
    return new InstanceAllocator(options).allocate();
  }
}