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
      var d = dnode(publicize(models.createModel("users")));
      d.pipe(stream).pipe(d);
    });

    sock.install(server, "/dnode");
  }
}