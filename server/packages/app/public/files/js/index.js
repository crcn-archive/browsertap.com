var BrowserTap = require("./app");

$(document).ready(function () {
  new BrowserTap().initialize($("#application"))
});