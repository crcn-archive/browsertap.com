var mojo = require("mojojs");

module.exports = mojo.View.extend({
  paper: require("./index.pc"),
  render: function () {
    var sect = mojo.View.prototype.render.call(this);
    if (process.browser) {
      new Spinner().spin(this.$(".spinner")[0]); 
    }
    return sect;
  }
})