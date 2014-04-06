var mousetrap = require("mousetrap");

module.exports = function (app) {


  mousetrap.bind("alt+space", function (e) {
    app.mediator.execute("showBrowserPicker");
  });
};
