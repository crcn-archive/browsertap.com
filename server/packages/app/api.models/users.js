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
    console.log("LOGIN");
  },

  /**
   */

  signup: function (credentials, next) {
    
  },

  /**
   */

  resetPassword: function (options, next) {

  },

  /**
   */

  sendResetPasswordEmail: function (options, next) {

  }
});

module.exports = Users;