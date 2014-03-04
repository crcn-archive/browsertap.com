var store = require("store");

exports.generate = function () {
  var date = Date.now() + "." + Math.round(Math.random() * 99999999999);
  store.set("secret", date);
  return date;
}

exports.get = function () {
  return store.get("secret");
}