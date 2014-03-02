var MainView = require("./main");

var views = require("./components");
views.main = MainView;

module.exports = function (app) {
  for (name in views) {
    app.registerViewClass(name, views[name]);
  }
}