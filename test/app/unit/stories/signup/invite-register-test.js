var expect = require("expect.js"),
request    = require("request"),
helpers    = require("../../../../helpers");


describe("invite-register#", function () {

  var inviteOnly;

  before(function () {
    inviteOnly = apiApp.get("config.inviteOnly");
    apiApp.set("config.inviteOnly", true);
    frontApp.set("models.inviteOnly", true);
  });

  after(function () {
    apiApp.set("config.inviteOnly", inviteOnly);
    frontApp.set("models.inviteOnly", inviteOnly);
  });

  after(helpers.flushDb);


  it("properly redirects to the forgot password form from the link in the email", function (next) {

    var link = "http://localhost:" + apiApp.get("config.http.port") + "/signup/invitee";

    request(link, function (err, response) {
      expect(response.request.href).to.be("http://localhost:" + apiApp.get("config.http.port") + "/#!/signup/invitee");
      next();
    });
  });

  it("shows an error if the invite code is incorrect", function (next) {
    frontApp.router.redirect("/signup/invitee", function () {
      expect($(document.body).html()).to.contain("signup.errors.401");
      next();
    });
  });

  it("shows an error if the user hasn't been invited", function (next) {
    frontApp.router.redirect("/signup/" + helpers.fixtures.invitees.notInvited._id, function () {
      expect($(document.body).html()).to.contain("signup.errors.401");
      next();
    });
  });


  describe("with an invited user", function () {

    before(function (next) {
      frontApp.router.redirect("/signup/" + helpers.fixtures.invitees.invited._id, next);
    });

    it("is showing the signup form", function () {
      expect($(document.body).html()).to.contain("signup.buttons.returnToLogin");
    });

    it("is showing the user's email in the signup form, and it's disabled", function () {
      expect($(document.body).find("input[name='email']").val()).to.be(helpers.fixtures.invitees.invited.email);
      expect($(document.body).find("input[name='email']").prop("disabled")).to.be(true);
    });

    it("can properly signup", function (next) {
      var signupView = frontApp.getViewByName("signupView");
      signupView.get("user").setProperties({
        password: "password",
        confirmPassword: "password",
        name: "invited"
      });
      signupView.signup();
      signupView.bind("signupRequest.success", { max: 1, to: function (success) {
        expect(success).to.be(true);
        next();
      }}).now();
    });

    it("has redirected to the home page", function () {
      expect(frontApp.router.get("current").name).to.be("home");
    });
  })
});