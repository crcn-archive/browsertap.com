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

		app.models.set("login.flash.message", undefined);

		app.get("models.users").login(message.data, outcome.e(next).s(function (user) {
			console.log(user);
			app.models.set("user", user);
			app.router.redirect("home");
		}));
	},

	/**
	 */

	resetPassword: function (message, next) {

		var app = message.mediator.application;

		console.log(message.data)

		app.get("models.users").resetPassword(message.data, outcome.e(next).s(function () {
			app.models.set("login.flash.message", "You can now login")
			app.router.redirect("login");
		}));
	}
}