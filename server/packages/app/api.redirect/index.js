exports.require = ["express.server"];
exports.load = function (server) {
  server.all("/resetPassword/:code", function (req, res) {
    res.redirect("/#!/forgot/reset/" + req.params.code);
  });
}