var domready = require("domready");

module.exports = {
  "pre bootstrap": function (message, next) {
    domready(function () {
      next();
    });
  }
};