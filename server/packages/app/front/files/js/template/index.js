var components     = require("../views/components"),
bindable           = require("bindable"),
pc                 = require("paperclip"),
paperclipComponent = require("paperclip-component"),
paperclipBootstrap = require("paperclip-bootstrap"),
modifiers          = require("./modifiers");

module.exports = function (app) {
  pc.use(paperclipComponent(new bindable.Object(components)));
  modifiers(app);
}