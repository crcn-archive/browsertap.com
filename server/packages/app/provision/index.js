var InstanceAllocator = require("./allocator"),
InstancePool          = require("./pool"),
_                     = require("underscore"),
desktopDecor          = require("./decor/desktop");



/**
 * connection between the provisioner and the application
 */

exports.require = ["aws"];
exports.load = function (aws) {


  aws.use(desktopDecor);

  
  var allocator = new InstanceAllocator({
    aws: aws,
    instanceType: "t1.micro",
    userId: "abcde",
    appName: "firefox",
    appVersion: 16,
    maxAge: 10
  });

  // allocator.allocate();
  
  var pool = new InstancePool({}).start();
  
  return function (options) {
    return new InstanceAllocator(_.extend({
      aws: aws
    }, options), pool).allocate();
  }
}