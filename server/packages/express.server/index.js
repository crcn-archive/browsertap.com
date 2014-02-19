var express = require("express")

exports.require = ["config"]
exports.load    = function (config) {

  var port;

  console.log("HTTP server listening on port %d", port = config.get("http.port"))

  var server = express()
  server.listen(port);
  return server;
}
  
  

