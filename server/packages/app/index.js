var express = require("express");

exports.require = ["express.server"];
exports.load = function (server) {
  server.use("/app", express.static(__dirname + "/public"));
}