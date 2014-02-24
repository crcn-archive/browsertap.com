module.exports = {

  /**
   */

  login: function (message, next) {
    console.log("login");
    next();
  },

  /**
   */

  logout: function (message, next) {
    message.mediator.application.router.redirect("login");
  },

  /**
   */

  signup: function (message, next) {
    console.log("signup");
    console.log(message.data);
  },

  /**
   */

  resetPassword: function (message, next) {
    console.log("reset password");
  },

  /**
   */

  sendResetPasswordEmail: function (message, next) {
    console.log("send reset password email");
    next();
  }
};