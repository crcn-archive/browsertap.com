var express = require("express")

exports.require = ["config", "mediator"]
exports.load    = function (config, mediator) {

  var port,
  server = express()

  mediator.on("post bootstrap", function (message, next) {

	  console.log("HTTP server listening on port %d", port = config.get("http.port"))

	  server.listen(port);
	  next();
  });
	
	
	return server;
}
  
  

