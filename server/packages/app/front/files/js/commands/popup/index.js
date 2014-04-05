var toggleView = require("./utils/toggleView");

module.exports = {
  "popup": function (message, next) {
    var view = message.data.view;

    $(document.body).append(view.render());
  },
  "showSettings": toggleView("settings"),
  "showBrowserPicker": toggleView("browserPicker")
}
