#!/usr/bin/env node
var awsm = require("awsm"),
aws      = awsm(require("../config").aws),
async    = require("async");

aws.use(require("awsm-ssh"));


var awsc = aws.chain();
aws.cli = {
  closeReadline: function () { },
  openReadline: function () { }
}

console.log("deploying to all running websites");

async.waterfall([


  /**
   */

  function (next) {
    awsc.
      ec2().
      regions().
      all().
      instances().
      find({ "tags.name": "website" }).
      parallel().
      rsync(__dirname + "/../../", "/home/ubuntu/apps/browsertap.com").
      then(next);
  },

  /**
   */

  function (args, next) {

    awsc.
      ec2().
      regions().
      all().
      instances().
      find({ "tags.name": "website" }).
      delay(1000 * 5).
      exec("sudo supervisorctl restart browsertap.com").
      then(next);
  }
], function (err) {

  if (err) {
    console.error(err);
    return process.exit(1);
  }

  console.log("all assets deployed");

  process.exit(0);
})

