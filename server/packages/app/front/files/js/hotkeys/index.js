var mousetrap = require("mousetrap");

module.exports = function (app) {


  mousetrap.bind("alt+space", function (e) {
    app.mediator.execute("showBrowserPicker");
  });


  app.mediator.on("post bootstrap", function () {
    // console.log("OK");
    app.mediator.execute("showBrowserPicker");
  });
};
