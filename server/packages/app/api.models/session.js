var BaseModel = require("./base/dbModel");

function Session () {
	BaseModel.apply(this, arguments);
	this.users = this.options.users;
}

BaseModel.extend(Session, {

	/**
	 */

	collectionName: "sessions",

	/**
	 */

	public: ["remove"],

	/**
	 */

	virtuals: {
		"user": function (next) {

			var self = this;

			this.app.models.findOne("user", { _id: this.get("userId") }, { users: this.users }, function(e, u) {
				if (!u) return next.apply(self, arguments);
				u.secret = self.get("secret");
				next(null, u);
			});
		}
	}
});

module.exports = Session;