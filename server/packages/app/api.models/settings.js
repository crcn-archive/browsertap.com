var BaseModel = require("./base/dbModel"),
_ = require("underscore");

function Settings () {

	BaseModel.apply(this, arguments);

	// if settings change by any means on the client-side, automatically
	// save them in the database
	this.on("change", _.bind(this._onChange, this));
}

BaseModel.extend(Settings, {

	/**
	 */

	public: ["__context"],

	/**
	 */

	collectionName: "settings",

	/**
	 */


	_onChange: function (key, value) {
		this.save();
	},

	/**
	 */

	serialize: function () {

		var clone = {}, d = this.toJSON();

		for (var name in d) {
			if (name === "userId" && this.get("_id")) continue;
			if (/_id/.test(name)) continue;
			clone[name] = d[name];
		}
		
		return clone;
	}
});

module.exports = Settings;