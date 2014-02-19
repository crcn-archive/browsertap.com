#!/usr/bin/env node
var deployAssets = require("./deployAssets");

deployAssets({
  name        : "website",
  keyPath     : "~/.ssh/id_browsertap.com",
  exec        : ["cd /home/ubuntu/apps/browsertap.com; make install-website"]
});
