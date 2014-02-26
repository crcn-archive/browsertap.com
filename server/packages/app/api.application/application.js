var bindable = require("bindable");

function Application () {
  bindable.Object.call(this, this);
}

bindable.Object.extend(Application, {
  use: function () {
    for (var i = arguments.length; i--;) {
      arguments[i](this);
    }
  }
});

module.exports = Application;