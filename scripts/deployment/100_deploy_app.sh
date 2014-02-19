#!/usr/bin/env node
var deployAssets = require("./deployAssets");

deployAssets({
  name        : "app",
  keyPath     : "~/.ssh/id_browsertap.com",
  exec        : [__dirname + "/../install/app.sh"]
});
