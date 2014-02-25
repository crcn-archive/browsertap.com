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

  },
  staging: {

  },
  production: {

  }
}