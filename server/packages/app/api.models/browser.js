var BaseModel = require("./base/model");

function Browser () {
  BaseModel.apply(this, arguments);
}

BaseModel.extend(Browser, {

  /**
   */

  deserialize: function (data) {
    return {
      os      : data.os,
      name    : data.name,
      version : data.version,
      status  : data.status
    }
  },

  /**
   */

  launch: function (next) {
    // 1. send launch command
    // 2. get status, bind to this browser model
  }
});

module.exports = Browser;