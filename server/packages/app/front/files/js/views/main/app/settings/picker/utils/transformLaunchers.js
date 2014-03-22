var bindable = require("bindable");

module.exports = function (launchers) {


  if (!launchers) return new bindable.Collection();
  var src = launchers.source(),
  browsers = new bindable.Collection();

  _addBrowsers(src, browsers);

  return browsers;
}

labels = {
  explorer: "Internet Explorer"
}


function _addBrowsers (src, browsers) {


  var models = {}, model;

  for (var i = src.length; i--;) {

    var launcher = src[i];

    if (!(model = models[launcher.get("appName")])) {
      model = models[launcher.get("appName")] = new bindable.Object({
        label: labels[launcher.get("appName")] || launcher.get("appName"),
        icon: launcher.get("appName"),
        child: new bindable.Collection()
      });
      browsers.push(model);
    }


    _addBrowser(model, launcher);
  }
}

function _addBrowser (app, launcher) {
  app.get("child").push(new bindable.Object({
    label: launcher.get("appVersion"),
    launcher: launcher
  }))
}


function _ (name) {

}
