var BaseModel = require("./base/model");

function Session () {
	BaseModel.apply(this, arguments);
}

BaseModel.extend(Session, {

	/**
	 */

	virtuals: {
		"user": function (next) {
			return this.app.models.createModel("user", { data: { _id: this.get("userId") }, session: this }).load(next);
		}
	},

	/**
	 */

	_save: function () {
		
	}
});

module.exports = Session;