var comerr = require("comerr");

module.exports = function (app) {

  var router = app.router;

  function auth (request, next) {

    if (!app.models.get("user._id")) {
      router.redirect("login");
      return next(comerr.unauthorized("not logged in"));
    }
    next();
  }

  router.
  param("code", function (request, next, _id) {
    app.models.get("users").getResetPasswordCode(_id, next);
  })

  router.
  param("invitee", function (request, next, _id) {
    app.models.get("users").getInvitee(_id, next);
  })

  router.
    route("/").
    name("home").
    enter(auth).
    states({
      main : "app",
      app  : "desktop"
    })

  router.
    route("/logout").
    name("logout").
    enter(function (request, next) {
      app.mediator.execute("logout");
      next();
    })

  router.
    route("/screen/:screen").
    enter(auth).
    enter(function (request, next) {
      // app.mediator.execute("connnect)
      console.log(request.query);
      app.mediator.execute("connect", {
        host: request.query.desktop
      }, function (err, desktop) {
        desktop.bind("screens", { max: 1, to: function (screens) {

          var targetScreen = screens.filter(function (screen) {
            return screen.get("_id") == request.params.screen;
          }).pop();

          app.models.set("mainScreen", targetScreen);
          next();
        }}).now();
      });
    }).
    states({
      main : "app",
      app  : "singleScreen"
    })


  router.
    route("/login").
    name("login").
    states({
      main : "auth",
      auth : "login"
    })

  router.
    route("/signup").
    name("signup").
    states({
      main : "auth",
      auth : "signup"
    })

  router.
    route("/signup/:invitee").
    name("signupInvitee").
    states({
      main : "auth",
      auth : "signup"
    })

  router.
    route("/iwantin").
    name("requestInvite").
    states({
      main          : "auth",
      auth          : "requestInvite",
      requestInvite : "form"
    })

  router.
    route("/iwantin/done").
    name("requestInviteDone").
    states({
      main          : "auth",
      auth          : "requestInvite",
      requestInvite : "complete"
    })

  router.
    route("/forgot/reset/:code").
    states({
      main : "auth",
      auth : "forgot",
      forgot : "reset"
    })

  router.
    route("/forgot").
    name("forgotPassword").
    states({
      main : "auth",
      auth : "forgot",
      forgot: "form"
    })

  router.
    route("/forgot/complete").
    states({
      main : "auth",
      auth : "forgot",
      forgot : "complete"
    })

}
