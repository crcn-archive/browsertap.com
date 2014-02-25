var less = require("less"),
glob     = require("glob"),
fs       = require("fs");

exports.require = ["config", "express.server"]
exports.load = function (config, server) {
  var cssParser = new less.Parser();
  server.get("/css/app.css", function (req, res) {
    var lessFiles = glob.sync(config.get("directories.root") + "/**/*.less"),
    buffer  = [];

    for (var i = lessFiles.length; i--;) {
      var path = lessFiles[i];
      if (fs.lstatSync(path).isDirectory()) continue;
      buffer.push(fs.readFileSync(path, { encoding: "utf8" }));
    }


    cssParser.parse(buffer.join("\n"), function (err, tree) {

      if (err) return res.send(JSON.stringify(err));

      res.setHeader("Content-Type", "text/css");
      res.send(tree.toCSS());
    })
  });
}