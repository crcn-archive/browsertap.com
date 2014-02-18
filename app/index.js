require("./bootstrap")({
  directories: {
    root: __dirname + "/packages"
  },
  http: {
    port: process.env.PORT || 80
  }
});