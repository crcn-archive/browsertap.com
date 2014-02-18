var pc     = require("paperclip"),
bindable   = require("bindable"),
protoclass = require("protoclass");


module.exports = function (layouts) {


  function LayoutBinding () {
    pc.BaseBlockBinding.apply(this, arguments);
  }

  return protoclass(pc.BaseBlockBinding, LayoutBinding, {
    _onChange: function (value) {
      
      var ops = {};

      if (typeof value === "string") {
        ops.name = value;
      } else {
        ops = value;
      }


      var tpl = pc.template(layouts.get(ops.name));


      this.context.set("blocks.main", this.contentTemplate.bind(this.context).render());
      this.section.replaceChildNodes(tpl.bind(this.context).render());
    }
  });
}