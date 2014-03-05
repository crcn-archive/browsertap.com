var BrowserTap = require("./app");

$(document).ready(function () {
  (window.app = new BrowserTap()).initialize($("#application"))
});