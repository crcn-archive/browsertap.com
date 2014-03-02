var bindable = require("bindable");

function Application (config) {
  bindable.Object.call(this, this);
  this.config = config;
  this.use(require("./utils"));
}

bindable.Object.extend(Application, {
  use: function () {
    for (var i = arguments.length; i--;) {
      arguments[i](this);
    }
  }
});

module.exports = Application;