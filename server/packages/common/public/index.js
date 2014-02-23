var express = require("express");

exports.require = ["express.server"];
exports.load = function (server) {
  server.use(express.static(__dirname + "/files"));

}