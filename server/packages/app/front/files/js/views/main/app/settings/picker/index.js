var mojo = require("mojojs"),
transformLaunchers = require("./utils/transformLaunchers");


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
    columns: require("./column")
  },

  /**
   */

  onSelectItem: function (item) {
    console.log(item.get("launcher"));
  }
});
