Logger = require("./logger");


module.exports = function (ops) {
  return {
    default: {
      logLevel: Logger.levels.ALL,
      inviteOnly: false,
      env: ops.env,
      fibers: ops.fibers,
      type: ops.type,
      domains: {
        app: "app.browsertap.com",
        website: "www.browsertap.com"
      },
      i18n: {
        configPath: __dirname + "/../lang"
      },
      directories: {
        root: __dirname + "/packages/" + ops.type
      },
      postmark: {
        key: "ef4b649e-1df9-43f2-a467-0046154c3d72",
        email: "noreply@browsertap.com"
      },
      http: {
        port: ops.port|| 8080,
        secureProtocol: "http:"
      },
      mongo: {
        "host": "mongodb://127.0.0.1:27017/browsertap-dev"
      },
    },
    development: {
      "domains": {
        "app": "localhost"
      }
    },
    testing: {
      logLevel: Logger.levels.NONE,
      "domains": {
        "app": "localhost"
      },
      http: {
        port: 8095
      }
    },
    staging: {
      "mongo": {
        "host": "mongodb://testing:a1c5ee280b@troup.mongohq.com:10032/browsertap-dev"
      },
      http: {
        port: 80
      }
    },
    production: {
      logLevel: Logger.levels.NOTICE
    }
  }
}
  