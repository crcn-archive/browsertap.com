var BaseModel = require("./base/dbModel"),
crypto        = require("crypto");

function Invitee () {
  BaseModel.apply(this, arguments);
}

BaseModel.extend(Invitee, {

  /**
   */

  collectionName: "invitees",

  /**
   */

  public: [
    "__context.email",
    "__context._id"
  ],


  serialize: function () {
    return { invited: this.get("invited") };
  },

  _create: function (next) {
    this.collection.insert({
      email    : this.get("email"),
      invited  : false
    }, next);
  }
});

module.exports = Invitee;