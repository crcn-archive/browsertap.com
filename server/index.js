var deepExtend = require("deep-extend"),
config = require("./config");

require("./bootstrap")(deepExtend(config.default, config[process.env.NODE_ENV] || {}));