module.exports = {
  default: {
    type: process.env.TYPE,
    domains: {
      app: "app.browsertap.com",
      website: "www.browsertap.com"
    },
    i18n: {
      configPath: __dirname + "/../lang"
    },
    directories: {
      root: __dirname + "/packages/" + process.env.TYPE
    },
    postmark: {
      key: "ef4b649e-1df9-43f2-a467-0046154c3d72",
      email: "noreply@browsertap.com"
    },
    http: {
      port: process.env.PORT || 80,
      secureProtocol: "http:"
    }
  },
  development: {
    "domains": {
      "app": "localhost"
    },
    "mongo": {
      "host": "mongodb://testing:a1c5ee280b@troup.mongohq.com:10032/browsertap-dev"
    }
  },
  staging: {

  },
  production: {

  }
};