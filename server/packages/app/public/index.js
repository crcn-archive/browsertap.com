var express = require("express"),
browserify  = require("browserify-middleware")

exports.require = ["express.server"];
exports.load = function (server) {
  server.use(express.static(__dirname + "/files"));
  server.use("/js/app.bundle.js", browserify(__dirname + "/files/main/index.js"));
}