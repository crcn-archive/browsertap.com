var BaseModel = require("./base/dbModel"),
moment        = require("moment"),
async         = require("async"),
comerr        = require("comerr"),
validatePasswordStrength = require("./users/utils/validatePasswordStrength"),
_ = require("underscore");

function ResetPasswordCode (options) {
  BaseModel.apply(this, arguments);
  this.user = options.user;
}

BaseModel.extend(ResetPasswordCode, {
  collectionName: "resetPasswordCodes",
  public: ["resetPassword"],
  virtuals: {
    "user": function (next) {
      this._findUser(next);
    }
  },
  resetPassword: function (password, complete) {

    var self = this;
    async.waterfall([
      validatePasswordStrength({ password: password }),
      _.bind(self._findUser, self),
      function onUser (user, next) {
        if (!user) return next(comerr.notFound());
        user.resetPassword(password, next);
      },
      function removeSelf (user, next) {
        self.remove(next);
      }
    ], complete);
  },
  _create: function (next) {
    this.collection.insert({
      userId: this.user.get("_id"),
      expiresAt: moment().add("hours", 24)._d
    }, next);
  },
  _findUser: function (next) {
    this.models.findOne("user", { _id: this.get("userId") }, next);
  }
});

module.exports = ResetPasswordCode;