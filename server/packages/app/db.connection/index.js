var mongodb = require("mongodb"),
MongoClient = mongodb.MongoClient;

exports.require = ["config", "api.application", "mediator"];
exports.load = function (config, app, mediator) {
	mediator.on("pre bootstrap", function (message, next) {
		console.log("connecting to mongodb");
		MongoClient.connect(config.get("mongo.host"), function (err, db) {
			app.set("db", db);
			next();
		});
	})
}