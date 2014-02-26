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
      return this._application.createModel("settings", { user: this }).load(next);
    },
    "launchers": function (next) {
      return this._application.createModel("launchers", { user: this }).load(next);
    }
  }

});

module.exports = User;