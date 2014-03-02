var expect = require("expect.js"),
helpers    = require("../../../../helpers");

describe("login#", function () {
  
  it("can navigate to the login page", function () {
    frontApp.router.redirect("login");
    expect(frontApp.router.get("current").name).to.be("login");
  });
  
  it("can navigate to the forgot password page from the login page", function () {
    frontApp.router.redirect("login");
    $(document.body).find("#login-reset-password-button").click();
    expect(frontApp.router.get("current").name).to.be("forgotPassword");
    frontApp.router.redirect("login");
  });

  it("can navigate to the signup page from the login page", function () {
    $(document.body).find("#login-signup-button").click();
    expect(frontApp.router.get("current").name).to.be("signup");
    frontApp.router.redirect("login");
  });


  var loginView;

  it("gets a 404 NOT FOUND if the email doesn't exist", function (next) {

    loginView = frontApp.getViewByName("LoginView");

    loginView.get("user").setProperties({
      email    : "notFound@browsertap.com",
      password : "password"
    });

    loginView.login();

    loginView.bind("loginRequest.error", { max: 1, to: function (error) {
      expect(error.code).to.be("404");
      next();
    }}).now();
  });

  it("gets a 602 INVALID if the email is incorrecty formatted", function (next) {

    loginView.get("user").setProperties({
      email    : "bad",
      password : "password"
    });

    loginView.login();

    loginView.bind("loginRequest.error", { max: 1, to: function (error) {
      expect(error.code).to.be("602");
      next();
    }}).now();
  });

  it("gets a 602 INVALID if the password is not present", function (next) {

    loginView.get("user").setProperties({
      email    : "notFound@browsertap.com",
      password : undefined
    });

    loginView.login();

    loginView.bind("loginRequest.error", { max: 1, to: function (error) {
      expect(error.code).to.be("602");
      next();
    }}).now();
  });

  it("can successfuly login", function (next) {
    loginView.get("user").setProperties(helpers.fixtures.users.u1);
    loginView.login();
    loginView.bind("loginRequest.success", { max: 1, to: function (success) {
      expect(success).to.be(true);
      next()
    }})
  });

  it("has navigated to the home page", function () {
    expect(frontApp.router.get("current").name).to.be("home");
  })
});