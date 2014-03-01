var postmark = require("postmark");

exports.require = ["config", "api.application"];
exports.load = function (config, app) {

  var pm = postmark(config.get("postmark.key"));

  return app.emailer = {
    send: function (options, next) {

      var payload = {
        From     : options.from || config.get("postmark.email"),
        To       : options.to,
        Subject  : options.subject,
        TextBody : options.body
      };

      pm.send(payload, function (err) {
        if (err) {
          console.error(err);
        }
        next.apply(this, arguments);
      });
    }
  }
}