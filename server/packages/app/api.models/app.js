var BaseModel = require("./base/model");

function App () {
  BaseModel.apply(this, arguments);
}

BaseModel.extend(App, {

  /**
   */

  login: function (credentals, next) {

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

module.exports = App;