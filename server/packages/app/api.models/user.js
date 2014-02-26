var BaseModel = require("./base/model");

function User () {
  BaseModel.apply(this, arguments);
}

BaseModel.extend(User, {

  /**
   */

  public: [
    "settings", 
    "browsers",
    "__context.email",
    "__context._id"
  ],

  /**
   */

  virtuals: {
    "settings": function (next) {
      return this._application.createModel("settings", this).load(next);
    },
    "browsers": function (next) {
      return this._application.createModel("browsers", this).load(next);
    }
  }

});

module.exports = User;