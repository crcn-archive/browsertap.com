#!/usr/bin/env node
var deployAssets = require("./deployAssets");

deployAssets({
  name        : "website",
  keyPath     : "~/.ssh/id_browsertap.com",
  exec        : [__dirname + "/../install/website.sh", "sudo killall -9 node"]
});
