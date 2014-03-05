var mojo = require("mojojs"),
verify   = require("verify")();

module.exports = mojo.View.extend({

  bindings: {
    "value, type": {
      "ok": {
        "map": function (value, type) {
          var check = {};
          check[type] = value;
          return verify.that(check).has(type).success;
        }
      },
      "show": {
        "map": function (value, type) {
          return type == undefined || value != null;
        }
      }
    }
  },

  paper: require("./index.pc")
});