var dnode = require("dnode"),
shoe      = require("shoe");

module.exports = {
  "pre bootstrap": function (message, next) {


    function connect (next) {
      var stream = shoe("/dnode"),
      d = dnode();
      d.on("remote", function (users) {
        message.mediator.application.models.set("users", users);
        if (next) next();
      });

      stream.on("end", function () {

        // TODO - need to re-login user
        setTimeout(function () {
          connect();
        }, 1000);
      });

      d.pipe(stream).pipe(d);
    }

    connect(next)
  }
};