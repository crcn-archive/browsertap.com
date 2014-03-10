var request = require("request"),
hurryup     = require("hurryup"),
outcome     = require("outcome");

var decorator = {
  test: function (model) {
    return model.name === "instance" && model.get("tags.name") === "website";
  },
  decorate: function (model) {
    model.getStatus = function (complete) {

      var self  = this,
      statusUrl = "http://" + this.get("addresses.publicDNS") + "/status";

      hurryup(function (next) {
        request(statusUrl, outcome.e(next).s(function (res, body) {
          next(null, body);
        }));
      }, { timeout: 1000 * 60 * 5 })(complete);
    }
  }
}

module.exports = function (awsm) {
  awsm.decorator(decorator);
};