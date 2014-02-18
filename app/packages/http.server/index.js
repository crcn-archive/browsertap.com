var net = require("net");
exports.require = ["config"]
exports.load = function (config) {
  
  console.log("HTTP server listening on port %d", port = config.get("http.port"))
  
  var server = net.createServer()
  server.listen(port)
  return server;

}