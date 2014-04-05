module.exports = function (name) {
  return function (message, next) {
    var app = message.mediator.application, view;

    var modelName = name + "View";

    if (view = app.models.get(modelName)) {
      view.close();
      return next();
    }

    app.models.set(modelName, view = app.createView(name));

    view.once("remove", function () {
      app.models.set(modelName, undefined);
    })

    message.mediator.execute("popup", {
      view: view
    });

    next();
  }
}
