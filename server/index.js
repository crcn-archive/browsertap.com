require("./bootstrap")({
  type: process.env.TYPE,
  directories: {
    root: __dirname + "/packages/" + process.env.TYPE
  },
  http: {
    port: process.env.PORT || 80
  }
});