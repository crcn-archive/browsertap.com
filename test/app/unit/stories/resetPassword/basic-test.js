var expect = require("expect.js"),
helpers    = require("../../../../helpers");

describe("reset-password#", function () {

  after(helpers.flushDb);

  it("can navigate to the forgot password page from the login page", function () {
    frontApp.router.redirect("login");
    $(document.body).find("#login-reset-password-button").click();
    expect(frontApp.router.get("current").name).to.be("forgotPassword");
    frontApp.router.redirect("login");
  });

  var forgotView;

  it("shows a 404 NOT FOUND error if the user doesn't exist", function (next) {
    forgotView = frontApp.getViewByName("forgotFormView");
    forgotView.get("user").setProperties({
      email: "notFound@email.com"
    });
    forgotView.resetPassword();
    forgotView.bind("resetPasswordRequest.error", { max: 1, to: function (error) {
      expect(error.code).to.be("404");
      next();
    }}).now();
  });

  it("shows a 602 INVALID if the email is invalid", function (next) {

    forgotView.get("user").setProperties({
      email: "bad"
    });
    forgotView.resetPassword();
    forgotView.bind("resetPasswordRequest.error", { max: 1, to: function (error) {
      expect(error.code).to.be("602");
      next();
    }}).now();
  });

  it("can successfully reset a user's password", function (next) {
    forgotView.get("user").setProperties(helpers.fixtures.users.u1);
    forgotView.resetPassword();
    forgotView.bind("resetPasswordRequest.success", { max: 1, to: function (success) {
      expect(success).to.be(true);
      next();
    }}).now();
  });


});