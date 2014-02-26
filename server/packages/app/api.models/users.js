var BaseCollection = require("./base/collection"),
async = require("async");

function Users () {
  BaseCollection.apply(this, arguments);
  this.collection = this.app.db.collection("users");
}

BaseCollection.extend(Users, {

  /**
   */

  public: ["login", "signup", "resetPassword", "sendResetPasswordEmail"],

  /**
   */

  login: function (credentials, next) {

    var col = this.collection, self = this;

    async.waterfall([

      function findUser (next) {
        col.findOne(credentials, next);
      },

      function onFoundUser (user, next) {
        if (!user) return next(new Error("invalid credentials"));
        next(null, self.app.models.createModel("user", { data: user }));
      }

    ], next);

  },

  /**
   */

  signup: function (credentials, next) {

    var col = this.collection, self = this;

    async.waterfall([

      function findUser (next) {
        col.findOne({ email: credentials.email }, next);
      },

      function onFoundUser (user, next) {
        if (user) return next(new Error("user already exists"));
        next();
      },

      function signupUser (next) {
        col.insert({
          email: credentials.email,
          password: credentials.password
        }, next);
      },

      function onSignedUpUser (users) {
        next(null, self.app.models.createModel("user", { data: users[0] }));
      }
    ], next);
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