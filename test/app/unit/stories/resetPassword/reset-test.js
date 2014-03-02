var expect = require("expect.js"),
helpers    = require("../../../../helpers"),
sinon      = require("sinon"),
request    = require("request");

describe("reset-password#", function () {

  after(helpers.flushDb);


  it("properly redirects to the forgot password form from the link in the email", function (next) {

    var link = "http://localhost:" + apiApp.get("config.http.port") + "/resetPassword/" + helpers.fixtures.users.forgotPassword.resetPasswordCode;

    request(link, function (err, response) {
      expect(response.request.href).to.be("http://localhost:" + apiApp.get("config.http.port") + "/#!/forgot/reset/" + helpers.fixtures.users.forgotPassword.resetPasswordCode);
      next();
    });

  });

  it("can redirect to the reset password page", function (next) {
    frontApp.router.bind("location", { max: 1, to: function () {
      next();
    }});
    frontApp.router.redirect("/forgot/reset/" + helpers.fixtures.users.forgotPassword.resetPasswordCode);
  })

  var resetPasswordView;

  it("shows a 601 INCORRECT INPUT if the passwords don't match", function (next) {
    resetPasswordView = frontApp.getViewByName("resetPasswordView");

    resetPasswordView.get("user").setProperties({
      password: "ab",
      confirmPassword: "ab2"
    });

    resetPasswordView.resetPassword();

    resetPasswordView.bind("resetPasswordRequest.error", { max: 1, to: function (error) {
      expect(error.code).to.be("601");
      next();
    }}).now();
  });

  it("shows a 602 INVALID if the passwords aren't strong enough", function (next) {

    resetPasswordView.get("user").setProperties({
      password: "ab",
      confirmPassword: "ab"
    });
    
    resetPasswordView.resetPassword();

    resetPasswordView.bind("resetPasswordRequest.error", { max: 1, to: function (error) {
      expect(error.code).to.be("602");
      next();
    }}).now();
  });

  it("can successfuly reset the password", function (next) {

    resetPasswordView.get("user").setProperties({
      password: "password5",
      confirmPassword: "password5"
    });
    
    resetPasswordView.resetPassword();

    resetPasswordView.bind("resetPasswordRequest.success", { max: 1, to: function (success) {
      expect(success).to.be(true);
      expect(frontApp.router.get("current").name).to.be("home");
      frontApp.router.redirect("login");
      next();
    }}).now();
  });

  it("the user can login with the new password", function (next) {
    var loginView = frontApp.getViewByName("LoginView");

    loginView.get("user").setProperties({
      email: helpers.fixtures.users.forgotPassword.email,
      password: "password5"
    });

    loginView.login();
    
    loginView.bind("loginRequest.success", { max: 1, to: function (v) {
      expect(v).to.be(true)
      expect(frontApp.router.get("current").name).to.be("home");
      next();
    }}).now();
  });
});