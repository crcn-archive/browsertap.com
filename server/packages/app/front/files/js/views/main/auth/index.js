var mojo = require("mojojs"),
bindable = require("bindable");

module.exports = mojo.View.extend({

  /**
   */

  paper: require("./index.pc"),

  /**
   */

  bindings: {
    "models.states.auth": "sections.pages.currentName"
  },

  /**
   */

  initialize: function () {
    mojo.View.prototype.initialize.apply(this, arguments);
    this.set("user", new bindable.Object());
  },

  /**
   */

  sections: {
    pages: {
      type: "states",
      views: [
        { class: require("./login")  , name: "login"  },
        { class: require("./forgot") , name: "forgot" },
        { class: require("./signup") , name: "signup" }
      ],
      transition2: function(from, to, next) {
        var felms = (from ? from.$() : $("<div>")).filter(function (index, elm) {
          return elm.nodeType === 1;
        });
        var telms = to.$().filter(function (index, elm) {
          return elm.nodeType === 1;
        });

        $(".card").removeClass("flipped");
        felms.removeClass("back");
        felms.addClass("front");
        telms.removeClass("front");
        telms.addClass("back");

        setTimeout(function () {

        });


        // setTimeout(next, 1000);
      },
      transition: function (from, to, next) {

        if (!process.browser) return next();

        felms = (from ? from.$() : $("<div>")).filter(function (index, elm) {
          return elm.nodeType === 1;
        })
        telms = to.$().filter(function (index, elm) {
          return elm.nodeType === 1;
        })
        telms.css({ "display": "none", "opacity": 0 });

        felms.transition({ "opacity": 0, duration: 100 }, function () {
          felms.css({ "display": "none" });
          telms.css({ "opacity": 0, "display": "block" });
          telms.transition({"opacity": 1, duration: 100 }, next);
        })
      }
    }
  }
});