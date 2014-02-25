var express = require("express"),
browserify  = require("browserify-middleware"),
transform   = require("./transform");

exports.require = ["express.server"];
exports.load = function (server) {
  server.use(express.static(__dirname + "/files"));

  server.get("/js/app.bundle.js", browserify(__dirname + "/files/js/index.js", { transform: transform, extensions: transform.extensions }));
}