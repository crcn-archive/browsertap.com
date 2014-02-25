var BaseCollection = require("./base/collection");

function Users () {
  BaseCollection.apply(this, arguments);
}

BaseCollection.extend(Users, {

  /**
   */

  public: ["login", "signup", "resetPassword", "sendResetPasswordEmail"],

  /**
   */

  login: function (credentials, next) {
    console.log(credentials);
    next(new Error("unable to login at this time"));
  },

  /**
   */

  signup: function (credentials, next) {
    console.log(credentials);
    next(new Error("unable to signup at this time"));
  },

  /**
   */

  resetPassword: function (options, next) {
    console.log(options);
    next(new Error("unable to reset password at this time"));
  },

  /**
   */

  sendResetPasswordEmail: function (options, next) {
    console.log(options);
    next(new Error("unble to send reset pssword email at this time"));
  }
});

module.exports = Users;