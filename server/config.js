
module.exports = function (ops) {
  return {
    default: {
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
      }
    },
    development: {
      "domains": {
        "app": "localhost"
      },
      "mongo": {
        "host": "mongodb://127.0.0.1:27017/browsertap-dev"
      }
    },
    staging: {
      "mongo": {
        "host": "mongodb://testing:a1c5ee280b@troup.mongohq.com:10032/browsertap-dev"
      }
    },
    production: {

    }
  }
}
  