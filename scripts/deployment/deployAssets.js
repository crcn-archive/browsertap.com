var awsm = require("awsm"),
aws      = awsm(require("../config").aws),
async    = require("async");

aws.use(require("awsm-ssh"));

module.exports = function (options, next) {


  var awsc = aws.chain(), search = { "tags.name": options.name };

  console.log("deploying to all running websites");

  async.waterfall([

    /**
     */

    function deployAssets (next) {
      awsc.
        ec2().
        regions().
        all().
        instances().
        find(search).
        parallel().
        rsync({ 
          keyPath: options.keyPath,
          from: __dirname + "/../../", 
          to: "/home/ubuntu/apps/" + options.name
        }).
        then(next);
    },

    /**
     */

    function execAdditional (args, next) {
      async.eachSeries(options.exec || [], function (script, next) {
        awsc.
          ec2().
          regions().
          all().
          instances().
          find(search).
          exec({
            keyPath: options.keyPath,
            script: script
          }).
          then(next);
        }, next);
    },

    /**
     */

    function restartServers (args, next) {

      awsc.
        ec2().
        regions().
        all().
        instances().
        find(search).
        delay(1000 * 5).
        exec({
          keyPath: options.keyPath,
          script: "sudo supervisorctl restart " + options.name
        }).
        then(next);
    }
  ], function (err) {

    if (err) {
      console.error(err);
      return process.exit(1);
    }

    console.log("all assets deployed");

    process.exit(0);
  });
}