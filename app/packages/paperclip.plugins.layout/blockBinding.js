var pc     = require("paperclip"),
bindable   = require("bindable"),
protoclass = require("protoclass");

function BlockBinding () {
  pc.BaseBlockBinding.apply(this, arguments);
}

module.exports = protoclass(pc.BaseBlockBinding, BlockBinding, {
  _onChange: function (value) {
    this.context.set("blocks." + value, this.contentTemplate.bind(this.context).render());
  }
});