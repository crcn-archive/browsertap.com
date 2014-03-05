var expect = require("expect.js"),
helpers    = require("../../../../helpers"),
sinon      = require("sinon"),
request    = require("request");

describe("signup#", function () {

  after(helpers.flushDb);

  before(function () {
    apiApp.set("config.inviteOnly", false);
  });

  after(function () {
    apiApp.set("config.inviteOnly", true);
  });


  var signupView, user;

  before(function () {
    frontApp.router.redirect("signup");
    signupView = frontApp.getViewByName("signupView");
    user = signupView.get("user");
  });


  it("shows a 602 INVALID error if not all form items are filled", function (next) {
    signupView.signup();
    signupView.bind("signupRequest.error", { max: 1, to: function (error) {
      expect(error.code).to.be("602");
      next();
    }}).now();
  });

  it("shows a 601 INCORRECT INPUT if the passwords don't match", function (next) {
    user.setProperties({
      name: "name",
      email: "notRegistered@browsertap.com",
      password: "password",
      confirmPassword: "abba"
    })
    signupView.signup();
    signupView.bind("signupRequest.error", { max: 1, to: function (error) {
      expect(error.code).to.be("601");
      next();
    }}).now();
  });

  it("shows a 602 INVALID if the password isn't strong enough", function (next) {
    user.setProperties({
      email: "notRegistered@browsertap.com",
      password: "pass",
      confirmPassword: "pass"
    });

    signupView.signup();
    signupView.bind("signupRequest.error", { max: 1, to: function (error) {
      expect(error.code).to.be("602");
      next();
    }}).now();
  });

  it("shows a 604 exists error", function (next) {
    user.setProperties(helpers.fixtures.users.u1);
    user.setProperties({ confirmPassword: helpers.fixtures.users.u1.password })

    signupView.signup();
    signupView.bind("signupRequest.error", { max: 1, to: function (error) {
      expect(error.code).to.be("604");
      next();
    }}).now();
  });

  it("can successfuly signup", function (next) {
    user.setProperties(helpers.fixtures.users.notSignedUp);
    user.setProperties({ confirmPassword: helpers.fixtures.users.notSignedUp.password });

    signupView.signup();
    signupView.bind("signupRequest.success", { max: 1, to: function (success) {
      expect(success).to.be(true);
      next();
    }}).now();
  });

  it("is on the home page", function () {
    expect(frontApp.router.get("current").name).to.be("home");
  });
});