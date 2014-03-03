var expect = require("expect.js"),
sinon      = require("sinon"),
helpers    = require("../../../../helpers");

describe("invite#", function () {

  after(helpers.flushDb);

  it("can invite a number of users", function (next) {
    var stub = sinon.stub(apiApp.emailer, "send").yields(null, null);
    apiApp.models.createModel("users").sendUserInvitations({ limit: 10 }, function () {
      expect(stub.callCount).to.be(1);
      expect(stub.args[0][0].body).to.contain("localhost/signup/" + helpers.fixtures.invitees.notInvited._id);
      stub.restore();
      next();
    });
  });
});