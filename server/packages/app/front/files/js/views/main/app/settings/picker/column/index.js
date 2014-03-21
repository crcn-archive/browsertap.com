var mojo = require("mojojs");

var ColumnView;

module.exports = ColumnView = mojo.View.extend({

  /**
   */

  percWidth: 50,

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

    if (this.currentModel) {
      this.currentModel.set("selected", false);
    }

    this.currentModel = model;

    model.set("selected", true);

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
  },

  /**
   */

  remove: function () {
    ColumnView.__super__.remove.call(this);
    if (this.currentModel) {
      this.currentModel.set("selected", false);
    }
  }
});
