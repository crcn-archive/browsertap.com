var pc             = require("paperclip"),
bindable           = require("bindable"),
layoutBlockBinding = require("./layoutBinding"),
BlockBinding       = require("./blockBinding");

exports.load = function () {
  var layouts = new bindable.Object();
  pc.blockBinding("layout", layoutBlockBinding(layouts));
  pc.blockBinding("block", BlockBinding);
  return layouts;
}