var BaseModel = require("./base/model"),
_ = require("underscore");

function Settings () {

	BaseModel.apply(this, arguments);

	// if settings change by any means on the client-side, automatically
	// save them in the database
	this.on("change", _.bind(this._onChange, this));

	// make the entire context public
	for (var key in this.__context) {
		this.public.push("__context." + key);
	}
}

BaseModel.extend(Settings, {

	/**
	 */


	_onChange: function (key, value) {
		this.save();
	}
});

module.exports = Settings;