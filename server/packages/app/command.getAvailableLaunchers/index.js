var memoize = require("memoizee"),
outcome     = require("outcome");

exports.require = ["mediator", "aws"];
exports.load = function (mediator, aws) {

  var awsc = aws.chain();


  function getLaunchers (complete) {


    // just want one region - all images should be synchronized across all regions
    awsc.ec2().regions().all().limit(1).images().find({ "tags.name": "desktop" }).then(outcome.e(complete).s(function(images) {

      var launchers = [];
      var id = 0;

      for(var i = images.length; i--;) {
        var image = images[i], tags = image.get("tags");

        for (var key in tags) {

          // mus be something like app:chrome, app:firefox, app:ie, etc.
          if (key.substr(0, 4) !== "app:") continue;

          // versions must be comma delimited
          var versions = tags[key].split(",");

          for (var j = versions.length; j--;) {
            launchers.push({
              _id: "launcher" + (id++),
              image: image.context(),
              appName: key.substr(4),
              appVersion: versions[j]
            });
          }
        }
      }
      
      complete(null, launchers);
    }));
  }

  getLaunchers = memoize(getLaunchers, { maxAge: 1000 * 20,  async: true });

  mediator.on("getAvailableLaunchers", function (message, complete) {
    getLaunchers(complete);
  });
}
