Logger = require("./logger");


module.exports = function (ops) {
  return {
    default: {
      logLevel: Logger.levels.ALL,
      inviteOnly: true,
      env: ops.env,
      fibers: ops.fibers,
      type: ops.type,
      domains: {
        app: "app.browsertap.com",
        website: "www.browsertap.com",
        provision: "provision.browsertap.com"
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
      aws: {
        "key"    : "AKIAJKP54HI4S4Z235CA",
        "secret" : "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",
        "log": {
          "level": "notice"
        },
        "ec2": {
          "regions": ["us-east-1"]
        }
      }
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
  