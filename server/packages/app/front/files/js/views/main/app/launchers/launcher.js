var mojo = require("mojojs");

module.exports = mojo.View.extend({
  paper: require("./launcher.pc"),
  launch: function () {
    this.application.mediator.execute("launch", this.model);
  }
});
