var express = require("express")

exports.require = ["http.server"]
exports.load    = function (httpServer) {

  var server = express()
  server.listen(httpServer);
  server.connection = httpServer
  return server;
}
  
  

