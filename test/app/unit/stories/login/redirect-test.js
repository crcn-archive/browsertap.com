var expect = require("expect.js");

describe("redirect#", function () {

  before(function () {
    frontApp.models.set("user", undefined);
  });

  ["home"].forEach(function (page) {
    it("redirect to login page if on " + page + " page", function (next) {
      frontApp.router.redirect(page, function () {
        expect(frontApp.router.get("current").name).to.be(page);
        next();
      });
    })
  });
})