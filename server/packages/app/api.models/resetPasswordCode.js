var BaseModel = require("./base/dbModel"),
moment = require("moment");

function ResetPasswordCode (options) {
  BaseModel.apply(this, arguments);
  this.user = options.user;
}

BaseModel.extend(ResetPasswordCode, {
  collectionName: "resetPasswordCodes",
  _create: function (next) {
    this.collection.insert({
      user: this.user.get("_id"),
      expiresAt: moment().add("hours", 24)._d
    }, next);
  }
});

module.exports = ResetPasswordCode;