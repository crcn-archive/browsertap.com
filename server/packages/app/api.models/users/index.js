var BaseCollection       = require("../base/dbCollection"),
async                    = require("async"),
verify                   = require("verify")(),
comerr                   = require("comerr"),
crypto                   = require('crypto'),
bindable                 = require("bindable"),
pc                       = require("paperclip"),
validatePasswordStrength = require("./utils/validatePasswordStrength"),
forgotTemplate           = pc.template(require("./views/forgot.pc"));

function Users () {
  BaseCollection.apply(this, arguments);
}

BaseCollection.extend(Users, {

  /**
   */

  modelName: "user",

  /**
   */

  public: ["login", "signup", "resetPassword", "sendResetPasswordEmail"],

  /**
   */

  fiberize: ["login", "signup", "resetPassword", "sendResetPasswordEmail"],


  /**
   * 1. create session
   */

  login: function (credentials, complete) {

    var self = this;

    // TODO - flow control check for session, or credentials

    async.waterfall([

      function validate (next) {
        verify.that(credentials).has("email", "password").then(next);
      },

      function findUser (next) {
        self.findOne({ 
          email    : credentials.email, 
          password : {
            $in: [

              // hash it
              crypto.createHash('md5').update(credentials.password).digest("hex").toString(),

              // could also be a hash
              credentials.password
            ]
          }
        }, next);
      },

      function onFoundUser (user, next) {
        if (!user) return next(comerr.notFound());

        // todo - make session object here with ttl
        next(null, user);
      }

    ], complete);

  },

  /**
   * TODO
   * 1. salt password
   * 2. validate user / pass format
   */

  signup: function (credentials, complete) {

    var self = this;

    async.waterfall([

      function validate (next) {
        verify.that(credentials).has("email", "password").then(next);
      },

      validatePasswordStrength(credentials),

      function findUser (next) {
        self.findOne({ email: credentials.email }, next);
      },

      function onFoundUser (user, next) {
        if (user) return next(comerr.alreadyExists());
        next();
      },

      function signupUser (next) {
        self.app.models.createModel("user", { 
          data: {
            email: credentials.email,
            password: credentials.password
          } 
        }).save(next);
      }
    ], complete);
  },

  /**
   */

  resetPassword: function (options, complete) {

    var self = this, code;

    async.waterfall([

      function validate (next) {
        verify.that(options).has("password", "code").then(next);
      },

      validatePasswordStrength(options),

      function findResetPasswordCode (next) {
        self.app.models.findOne("resetPasswordCode", { _id: {$oid: options.code } }, next);
      },

      function onPasswordCode (c, next) {
        if (!c) return next(comerr.notFound("code not found"));
        code = c;
        self.app.models.findOne("user", {_id: {$oid: code.get("user") }}, next);
      },

      function onUser (user, next) {
        if (!user) return next(comerr.notFound("user not found"));
        user.resetPassword(options.password, next);
      },

      function onReset(user, next) {
        code.remove(next);
      }
    ], complete);
  },

  /**
   */

  sendResetPasswordEmail: function (credentials, complete) {

    var self = this;

    async.waterfall([

      function validate (next) {
        verify.that(credentials).has("email").then(next);
      },

      function findUser (next) {
        self.findOne({ email: credentials.email }, next);
      },

      function createResetPasswordCode (user, next) {
        if (!user) return next(comerr.notFound("user not found"));
        
        self.app.models.createModel("resetPasswordCode", { user: user }).save(next);
      },

      function sendResetPasswordEmail (resetPasswordCode, next) {

        var resetLink = self.app.get("config.http.secureProtocol") + "//" + self.app.get("config.domains.app") + "/resetPassword/" + resetPasswordCode.get("_id")

        var body = forgotTemplate.bind(new bindable.Object({
          resetLink : resetLink
        })).render().toString();

        self.app.emailer.send({
          title : "You requested a password reset",
          to    : resetPasswordCode.user.get("email"),
          body  : body
        }, next);

      }
    ], complete);
  }
});

module.exports = Users;