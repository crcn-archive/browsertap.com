var expect = require("expect.js"),
helpers    = require("../../../../helpers");

// TODO - it cannot request an invite if already registered

describe("invite#", function () {

  var inviteOnly, requestInviteView, user;

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

  it("can click the 'request invite' button from the login page", function () {
    frontApp.router.redirect("login");
    $(document.body).find("#login-request-invite-button").click();
    expect(frontApp.router.get("current").name).to.be("requestInvite");
  }); 

  it("cannot request an invite if the email is invalid", function (next) {
    requestInviteView = frontApp.getViewByName("requestInviteView");
    requestInviteView.email = "abba";
    requestInviteView.requestInvite();
    requestInviteView.bind("requestInviteRequest.error", { max: 1, to: function (error) {
      expect(error.code).to.be("602");
      next();
    }})
  });

  it("can successfuly request an invite to use the application", function (next) {
    requestInviteView.email = "u4@browsertap.com";
    requestInviteView.requestInvite();
    requestInviteView.bind("requestInviteRequest.success", { max: 1, to: function (success) {
      expect(success).to.be(true);
      next();
    }})
  });

  it("is showing the request invite done page", function () {
    expect(frontApp.router.get("current").name).to.be("requestInviteDone");
    expect($(document.body).html()).to.contain("requestInvite.success");
  });
}); 