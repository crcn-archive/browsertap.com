require("./entry")({
  env  : process.env.NODE_ENV,
  type : process.env.TYPE,
  port : process.env.PORT
});