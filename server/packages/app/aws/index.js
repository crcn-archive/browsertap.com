var awsm = require("awsm");

exports.require = ["config"];
exports.load = function (config) {
  var aws = awsm(config.get("aws"))
  logger.info("using AWS regions %s", config.get("aws.ec2.regions").join(", "))
  return aws;
}