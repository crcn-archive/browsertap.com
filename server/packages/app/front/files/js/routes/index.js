var comerr = require("comerr");

module.exports = function (app) {

  var router = app.router;

  function auth (request, next) {
    if (!app.models.get("user")) {
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
      app  : "controller"
    })
  
  router.
    route("/logout").
    name("logout").
    enter(function (request, next) {
      router.redirect("login");
      next();
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