var outcome = require("outcome");

module.exports = {

	/**
	 */

	"signup": function (message, next) {

		var app = message.mediator.application;

		app.get("models.users").signup(message.data, outcome.e(next).s(function (user) {
			app.models.set("user", user);
			app.router.redirect("home");
		}));
	},

	/**
	 */

	"login": function (message, next) {

		var app = message.mediator.application;

		app.get("models.users").login(message.data, outcome.e(next).s(function (user) {
			console.log(user);
			app.models.set("user", user);
			app.router.redirect("home");
		}));
	}
}