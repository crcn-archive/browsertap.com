var outcome = require("outcome"),
comerr      = require("comerr");

module.exports = {

	/**
	 */

	"signup": function (message, next) {

		var app = message.mediator.application;

		var d = message.data;

    if (!d.email || !d.confirmPassword || !d.password) {
      return next(comerr.invalid());
    }

    if (d.confirmPassword !== d.password) {
      return next(comerr.incorrectInput())
    }

		app.get("models.users").signup(d, outcome.e(next).s(function (user) {
			app.models.set("user", user);
			app.router.redirect("home");
			next();
		}));
	},

	/**
	 */

	"login": function (message, next) {

		var app = message.mediator.application;

		app.models.set("login.flash.message", undefined);

		console.log("LOGIN");

		app.get("models.users").login(message.data, outcome.e(next).s(function (user) {
			app.models.set("user", user);
			app.router.redirect("home");
			console.log("NADA");
			next();
		}));
	},

	/**
	 */

	sendResetPasswordEmail: function (message, next) {
		var app = message.mediator.application;

    app.get("models.users").sendResetPasswordEmail(message.data, next);
	},

	/**
	 */

	resetPassword: function (message, next) {

		var app = message.mediator.application;

		var d = message.data;

		if (d.password !== d.confirmPassword) {
			return next(comerr.incorrectInput());
		}


		app.get("models.users").resetPassword(message.data, outcome.e(next).s(function () {
			app.models.set("login.flash.message", "You can now login")
			app.router.redirect("login");
			next();
		}));
	}
}