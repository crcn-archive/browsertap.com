module.exports = {
  default: {
    type: process.env.TYPE,
    directories: {
      root: __dirname + "/packages/" + process.env.TYPE
    },
    http: {
      port: process.env.PORT || 80
    }
  },
  development: {
    "mongo": {
      "host": "mongodb://testing:a1c5ee280b@troup.mongohq.com:10032/browsertap-dev"
    }
  },
  staging: {

  },
  production: {

  }
};