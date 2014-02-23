module.exports = function (app) {

  var router = app.router;


  router.
    route("/").
    name("home").
    states({
      main : "app",
      app  : "controller"
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
    route("/forgot/reset").
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