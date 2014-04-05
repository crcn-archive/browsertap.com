var mojo = require("mojojs");

module.exports = mojo.View.extend({

  /**
   */

  paper: require("./index.pc"),

  /**
   */

  bindings: {
    "models.user.launchers": "sections.browsers.source",

    // applies a filter against the list when browser
    "browserQuery": function (search) {
      if (!search) search = "";
      search = search.toLowerCase();
      this.set("browserFilter", function (model) {
        var fullName = (model.get("appName") + " " + model.get("appVersion")).toLowerCase();
        return ~fullName.indexOf(search);
      });
    }
  },
  sections: {
    browsers: {
      type: "list",
      modelViewClass: require("./browser"),
      filter: "browserFilter"
    }
  },
  checkDownKey: function (event) {
    if (event.keyCode !== 40) return;
    console.log("SELECT LIST");
  }
});
