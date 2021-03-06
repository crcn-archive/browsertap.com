var mojo           = require("mojojs"),
transformLaunchers = require("./utils/transformLaunchers"),
bindable           = require("bindable");


module.exports = mojo.View.extend({

  /**
   */

  paper: require("./index.pc"),

  /**
   */

  bindings: {
    "models.user.launchers": {
      "sections.columns.source": {
        "map": transformLaunchers
      },
      "loading": {
        "map": function (launchers) {
          return !launchers;
        }
      }
    }
  },

  /**
   */

  sections: {
    columns: {
      type: require("./column")
    }
  },

  /**
   */

  onSelectItem: function (item) {

    this.application.mediator.execute("launch", item.get("launcher"));

    var self = this;
    setTimeout(function () {
      self.bubble("close");
    }, 100);
  }
});
