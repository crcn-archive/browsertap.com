var protoclass = require("protoclass"),
_              = require("underscore"),
async          = require("async");


function DesktopPool (aws) {
  this.aws = this;
  setTimeout(_.bind(this.load, this));
  this.load();
}


protoclass(BrowserInstances, {

  /**
   */

  getAvailableBrowsers: function () {
    
  }
});

module.exports = BrowserInstances;