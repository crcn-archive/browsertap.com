var mojo     = require("mojojs"),
bindableCall = require("bindable-call");

module.exports = mojo.View.extend({

  /**
   */

  name: "requestInvitePagesView",

  /**
   */

  paper: require("./index.pc"),

  /**
   */

  bindings: {
    "models.states.requestInvite": "sections.pages.currentName"
  },

  /**
   */

  sections: {
    pages: {
      type: "states",
      views: [
        { class: require("./form")    , name: "form"     },
        { class: require("./complete"), name: "complete" }
      ]
    }
  }
});
