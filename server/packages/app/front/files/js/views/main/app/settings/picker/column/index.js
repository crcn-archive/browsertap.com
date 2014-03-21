var mojo = require("mojojs");

var ColumnView;

module.exports = ColumnView = mojo.View.extend({

  /**
   */

  paper: require("./index.pc"),

  /**
   */

  bindings: {
    "source": "columns"
  },

  /**
   */

  sections: {
    rows: {
      type: "list",
      source: "columns",
      modelViewClass: require("./row")
    }
  },

  /**
   */

  selectRow: function (model) {

    if (!model.get("child")) {
      return this._selectItem(model);
    }

    this.setChild("child", new ColumnView({
      source: model.get("child")
    }))
  },

  /**
   */

  _selectItem: function (model) {
    if (!this.has("onSelectItem")) return;
    this.get("onSelectItem").call(this, model);
  }
});
