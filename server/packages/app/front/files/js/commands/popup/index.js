
module.exports = {
  "popup": function (message, next) {
    var view = message.data.view;

    $(document.body).append(view.render());
  },
  "showSettings": function (message, next) {


    var app = message.mediator.application, view;

    if (view = app.models.get("settingsView")) {
      view.close();
      return next();
    }

    app.models.set("settingsView", view = app.createView("settings"));

    view.once("remove", function () {
      app.models.set("settingsView", undefined);
    })

    message.mediator.execute("popup", {
      view: view
    });

    next();
  }
}
