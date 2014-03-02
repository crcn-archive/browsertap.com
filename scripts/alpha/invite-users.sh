#!/usr/bin/env node

var browsertap = require("../../server/entry"),
async          = require("async"),
fs             = require("fs");

var env = String(process.argv[2]),
num     = parseInt(process.argv[3]);

if (!/development|testing|production|staging/.test(env)) {
  console.error("please type a proper env");
  process.exit(1);
}

if (isNaN(num)) {
  console.error("please provide a number of people to invite");
  process.exit(1);
}


browsertap({
  env     : "testing",
  type    : "app",
  fibers  : true
}, function (err, exports) {
  var app = exports["api.application"];
  app.models.createModel("users").sendUserInvitationsSync({ limit: num });
  console.log("done");
  process.exit();
}); 