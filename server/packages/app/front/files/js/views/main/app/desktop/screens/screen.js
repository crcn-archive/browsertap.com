var mojo = require("mojojs");

module.exports = mojo.View.extend({
  paper: require("./screen.pc"),
  show: function () {
    this.application.mediator.execute("setMainScreen", this.model);
  }
})