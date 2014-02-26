var dnode = require("dnode"),
shoe      = require("shoe");

exports.require = ["express.server", "api.models.core", "publicize"]
exports.load = function (server, models, publicize) {

  server.use(function (req, res, next) {

    if (!req.socket.server._dnoded) {
      req.socket.server._dnoded = true;
      _installDNode(req.socket.server);
    }

    next();
  });

  function _installDNode (server) {

    var sock = shoe(function (stream) {
      var m = models.createModel("users");
      var d = dnode(publicize(m));
      d.pipe(stream).pipe(d);
      stream.on("end", function () {
        m.dispose();
      })
    });

    sock.install(server, "/dnode");
  }
}