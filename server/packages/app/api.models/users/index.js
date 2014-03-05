var BaseCollection       = require("../base/dbCollection"),
async                    = require("async"),
verify                   = require("verify")(),
comerr                   = require("comerr"),
sift                     = require("sift"),
crypto                   = require('crypto'),
bindable                 = require("bindable"),
pc                       = require("paperclip"),
_                        = require("underscore"),
validatePasswordStrength = require("./utils/validatePasswordStrength"),
forgotTemplate           = pc.template(require("./views/forgot.pc")),
inviteTemplate           = pc.template(require("./views/invite.pc"));

function Users () {
  BaseCollection.apply(this, arguments);
  this.app.bind("config.inviteOnly", { target: this, to: "inviteOnly" }).now();
}

BaseCollection.extend(Users, {

  /**
   */

  modelName: "user",

  /**
   */

  public: [
    "login", 
    "signup", 
    "sendResetPasswordEmail", 
    "getResetPasswordCode", 
    "inviteOnly", 
    "requestInvite",
    "getInvitee",
    "getSession"
  ],

  /**
   */

  fiberize: [
    "login", 
    "signup", 
    "sendResetPasswordEmail", 
    "getResetPasswordCode",
    "sendUserInvitations",
    "requestInvite",
    "_sendInviteeEmail"
  ],


  /**
   * 1. create session - TODO - need client secret key for sessions
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
          email    : credentials.email
        }, next);
      },

      function onFoundUser (user, next) {
        if (!user) return next(comerr.notFound("user not found"));

        var samePassword = sift({
          $in: [
            // hash it
            crypto.createHash('md5').update(credentials.password).digest("hex").toString(),
            // could also be a hash
            credentials.password
          ]
        }).test(user.get("password"));

        if (!samePassword) return next(comerr.unauthorized("Incorrect password"));

        next(null, user);
      },

      function loginUser (user, next) {

        user.secret = credentials.secret;

        // todo - make session object here with ttl
        user.updateLastLogin(next);
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
        verify.that(credentials).has("name", "email", "password").then(next);
      },

      validatePasswordStrength(credentials),

      function validateInviteCode (next) {
        self._validateInvite(credentials, next);
      },

      function findUser (code, next) {  
        self.findOne({ email: credentials.email }, next);
      },

      function signupUser (user, next) {
        if (user) return next(comerr.alreadyExists());
        self.app.models.createModel("user", { 
          data: {
            name     : credentials.name,
            email    : credentials.email,
            password : credentials.password
          } 
        }).save(next);
      }
    ], complete);
  },

  /**
   */

  requestInvite: function (email, complete) {
    var self = this;
    async.waterfall([

      function validate (next) {
        verify.that({ email: email }).has("email").then(next)
      },

      function findInvite (next) {
        self.models.findOne("invitee", { email: email }, next);
      },

      function inviteUser (invitee, next) {
        if (invitee) return next(null, invitee);
        self.models.createModel("invitee", { data: { email: email } }).save(next);
      }

    ], complete);
  },

  /**
   */

  _validateInvite: function (credentials, complete) {


    if (!this.get("inviteOnly")) return complete(null, null);


    if (!credentials.inviteCode) {
      return complete(comerr.unauthorized("invite only"));
    }

    var self = this;

    async.waterfall([

      function findInviteCode (next) {
        self.models.findOne("invitee", { _id: {$oid: credentials.inviteCode}}, next);
      },

      function onInviteCode (code, next) {
        if (!code) return next(comerr.unauthorized("code not found"));
        if (!code.get("invited")) return next(comerr.unauthorized("not invited yet"));
        next(null, code);
      }
    ], complete);
  },

  /**
   */

  getResetPasswordCode: function (_id, complete) {
    this.app.models.findOne("resetPasswordCode", { _id: { $oid: _id }}, complete);
  },

  /**
   * TODO - need a few safeguards to prevent session injections
   */

  getSession: function (secret, _id, complete) {
    this.app.models.findOne("session", { _id: { $oid: _id }, secret: secret }, complete);
  },

  /**
   */

  getInvitee: function (_id, complete) {

    var self = this;

    async.waterfall([
      function findInvitee (next) {
        self.app.models.findOne("invitee", { _id: { $oid: _id }}, next);
      },
      function onInvitee (invitee, next) {
        if (!invitee || !invitee.get("invited")) return next(comerr.unauthorized("not invited"));
        next(null, invitee);
      }
    ], complete)
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
  },

  /**
   */

  sendUserInvitations: function (options, complete) {
    if (!options.limit) return complete(comerr.invalid("Please provide number of users"));

    var self = this;

    async.waterfall([

      function findInvitees (next) {
        self.models.find("invitee", { invited: false }, { limit: options.limit }, next);
      },

      function onInvitees (invitees, next) {

        async.eachSeries(invitees, _.bind(self._sendInviteeEmail, self), next);
      }
    ], complete);
  },

  /**
   */

  _sendInviteeEmail: function (invitee, complete) {
    var e;

    logger.verbose("inviting %s", e = invitee.get("email"));

    if (!e) {
      logger.verbose("skip invitee %s", invitee.get("_id"));
      return invitee.remove(complete);
    }

    var link = this.app.get("config.http.secureProtocol") + "//" + this.app.get("config.domains.app") + "/signup/" + invitee.get("_id")

    var body = inviteTemplate.bind(new bindable.Object({
      link : link
    })).render().toString();

    var self = this;

    async.waterfall([
      function sendEmail (next) {
        self.app.emailer.send({
          title : "You've been invited to BrowserTap",
          to    : e,
          body  : body
        }, function() { next(); });
      },
      function updateUser (next) {
        invitee.setProperties({ invited: true }).save(next);
      }
    ], complete)



  }
});

module.exports = Users;