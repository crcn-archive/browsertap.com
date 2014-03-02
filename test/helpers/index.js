var exec = require("child_process").exec;

module.exports = {
  fixtures: require("./fixtures"),
  flushDb: function (next) {
    exec("./scripts/testing/import-fixtures.sh", { cwd: __dirname + "/../../" }, next);
  }
};