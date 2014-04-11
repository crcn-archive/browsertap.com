var outcome    = require("outcome"),
comerr         = require("comerr"),
dnode          = require("dnode"),
shoe           = require("shoe"),
_wrapBindables = require("../utils/wrapBindables");

module.exports = {

	/**
	 */

	signup: function (message, next) {

		var app = message.mediator.application;

		var d = message.data;

    if (!d.email || !d.confirmPassword || !d.password || !d.name) {
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

	login: function (message, next) {

		var app = message.mediator.application;

		app.models.set("login.flash.message", undefined);

		app.get("models.users").login(message.data, outcome.e(next).s(function (user) {
			app.models.set("user", user);
			app.router.redirect("home");
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

	popout: function (message, next) {

		var screen = message.data.screen,
		screenId   = screen.get("_id");

		var domain = message.mediator.application.models.get("desktopDomain");

		var popup = window.open(window.location.origin + "/#!/screen/" + screenId + "?desktop=" + encodeURIComponent(domain), "_blank", "toolbar=0 menubar=0 location=0 scrollbars=0 width="+screen.get("width")+" height="+screen.get("height"));

		var pollTimer = setInterval(function () {
			if (popup.closed === true) {
				clearInterval(pollTimer);
				screen.close();
			}
		}, 200);
	},

	/**
	 */

	resetPassword: function (message, next) {

		var app = message.mediator.application;

		var d = message.data;

		if (d.password !== d.confirmPassword) {
			return next(comerr.incorrectInput());
		}

		var code = d.code;

		code.resetPassword(d.password, outcome.e(next).s(function () {

			// TODO
			message.mediator.execute("flashMessage", { message: "Successfuly reset password" });
			app.models.set("user", code.get("user"));
			app.router.redirect("home");
			next();
		}));
	},

	/**
	 */

	logout: function (message, next) {
		var app = message.mediator.application;

		if (app.models.get("user")) {
			app.models.get("user.session").remove();
			app.models.set("user", undefined);;
		}

		app.router.redirect("login");

		next();
	},

	/**
	 */

	requestInvite: function (message, next) {
		var email = message.data.email, app = message.mediator.application;
		app.get("models.users").requestInvite(email, next);
	},

	/**
	 */

	launch: function (message, next) {

		var d = message.data,
		launcher = d.launcher,
		url = d.url;

		message.mediator.application.models.set("launcher", launcher);

		launcher.launch(outcome.e(next).s(function (desktop) {

			var domain = desktop.addresses.publicIp;

			message.mediator.execute("connect", { host: domain }, next);
		}));
	},

	/**
	 */

	connect: function (message, next) {

		var domain = message.data.host;

		console.log("connecting to %s", domain);

		var stream = shoe("http://" + domain + "/dnode"),
		d = dnode();
		d.on("remote", function (desktop) {

			console.log("connected to %s", domain);

			var _desktop = _wrapBindables(desktop);

			message.mediator.application.models.set("desktop", _desktop);
			message.mediator.application.models.set("desktopDomain", domain);

			next(null, _desktop);
		});

		d.pipe(stream).pipe(d);
	},

	/**
	 */


	setMainScreen: function (message, next) {
		var screen = message.data;
		screen.stream.start();
		message.mediator.application.models.set("mainScreen", screen);
		next();
	}
}
