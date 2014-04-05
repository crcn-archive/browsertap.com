var mojo = require("mojojs");

module.exports = mojo.View.extend({
  paper: require("./index.pc"),
  sections: {
    pages: {
      type: "states",
      index: 0,
      views: [
        { class: require("./list")   , name: "list"   },
        { class: require("./search") , name: "search" }
      ]
    }
  },
  _render: function () {
    var self = this;
  },
  selectLauncher: function (launcher) {
    this.set("launcher", launcher);
    this.set("sections.pages.currentName", "search");
  },
  highlightLauncher: function (launcher) {
    this.set("highlightedLauncher", launcher);
  },
  search: function (url) {
    console.log(url);
    this.close();
  },
  close: function () {
    var self = this;
    this.$("#browser-picker-outer").transit({ scale: 1.25, opacity: 0 }, 300, "easeOutCubic", function () {
      self.remove();
    });
  }
})