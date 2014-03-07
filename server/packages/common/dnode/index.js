var dnode = require("dnode"),
shoe      = require("shoe");

exports.require = ["express.server", "mediator", "publicize"]
exports.load = function (server, mediator, publicize) {

  server.use(function (req, res, next) {

    if (!req.socket.server._dnoded) {
      req.socket.server._dnoded = true;
      _installDNode(req.socket.server);
    }

    next();
  });

  function _installDNode (server) {

    var sock = shoe(function (stream) {

      mediator.execute("getDNodeObject", function (err, obj) {
        if (err) return logger.error(err);
        var d = dnode(publicize(obj));
        d.pipe(stream).pipe(d);
      });
      
      stream.on("end", function () {
        m.dispose();
      })
    });

    sock.install(server, "/dnode");
  }
}