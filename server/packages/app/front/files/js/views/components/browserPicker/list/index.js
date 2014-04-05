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

      var self = this;

      this.set("browserFilter", function (model) {
        var fullName = (model.get("appName") + " " + model.get("appVersion")).toLowerCase();
        return ~fullName.indexOf(search);
      });

      this.set("selectedIndex", 0);
      this.reselectListItem();
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
    if (!/40|38/.test(String(event.keyCode))) return;
    this.moveListIndex(event.keyCode === 40 ? 1 : -1);
  },
  selectBrowser: function () {
    if (!this._prevChild) return;
    this.call("selectLauncher", [this._prevChild.get("model")]);
  },
  moveListIndex: function (pos) {
    var newPos = this.get("selectedIndex") + pos;

    if (newPos >= this.get("sections.browsers.length")) return;
    if (newPos < 0) return;

    this.set("selectedIndex", newPos);
    this.reselectListItem();
  },
  reselectListItem: function () {
    var self = this;
    this.application.animate({
      update: function () {
        var children = self.get("sections.browsers.children"),
        child = children.at(self.get("selectedIndex"));

        if (child) {
          if (self._prevChild) self._prevChild.set("selected", false);
          self._prevChild = child;
          child.set("selected", true);

          var $row = child.$("li"),
          top = $row.position().top,
          $list = $("#browser-picker-list");

          if (top > $list.height()) {
            return $row[0].scrollIntoView(false);
          } else if (top < 0) {
            return $row[0].scrollIntoView(true);
          }
        }
      }
    })
  }
});
