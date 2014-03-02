var comerr = require("comerr");

module.exports = function (options) {
  return function (next) {
    if (!options.password) return next(comerr.invalid());
    if (!/.{5,}/.test(options.password)) return next(comerr.invalid());
    return next();
  }
}