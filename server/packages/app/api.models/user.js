var BaseModel = require("./base/dbModel"),
crypto        = require("crypto");

function User () {
  BaseModel.apply(this, arguments);
  this.users = this.options.users;
  // this.remoteAdress = this.users.stream.remoteAddress;
}

BaseModel.extend(User, {

  /**
   */

  collectionName: "users",

  /**
   */

  public: [
    "browsers",
    "resetPassword",
    "__context.email",
    "__context._id",
    "__context.settings"
  ],

  /**
   */

  virtuals: {

    // creates a session
    "session": function (next) {
      return this.app.models.upsert("session", { userId: this.get("_id"), secret: this.secret }, next);
    },

    // the settings for the user
    "settings": function (next) {
      return this.app.models.upsert("settings", { userId: this.get("_id") }, next);
    },

    // application launchers
    "launchers": function (next) {
      return this.app.createModel("launchers", { user: this }).load(next);
    }
  },

  /**
   */

  updateLastLogin: function (next) {
    this.set("lastLoggedInAt", new Date());
    this.save(next);
  },

  /**
   */

  resetPassword: function (password, next) {
    this.set("password", crypto.createHash('md5').update(password).digest("hex").toString());
    this.save(next);
  },

  /**
   */

  _create: function (next) {
    this.collection.insert({
      email: this.get("email"),
      password: crypto.createHash('md5').update(this.get("password")).digest("hex").toString()
    }, next);
  },

  /**
   */

  _update: function (next) {
    this.collection.update({ 
      _id: this.get("_id") 
    }, {
      $set: {
        name           : this.get("name"),
        password       : this.get("password"),
        lastLoggedInAt : this.get("lastLoggedInAt")
      }
    }, next);
  }

});

module.exports = User;