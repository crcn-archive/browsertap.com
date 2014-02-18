var mojo = require("mojojs")

exports.require = ["views", "config", "views.application"]
exports.load = function (views, config, app) {


  _cachedViews = {}

  return {

    renderView: function (name, states) {

      var viewClass = views.get(name);

      // create one view for the entire process - this is OK
      // since rendering is synchronous
      if(!(view = _cachedViews[name])) {
        var view = _cachedViews[name] = new viewClass({}, app)
        view.render();
      }

      var models = view.application.models;

      return function (req, res) {

        // update the view properties which
        // might change the application state
        models.setProperties({
          states : states,
          query  : req.query,
          body   : req.body,
          params : req.params,
          config : config
        });

        // at this point, the application should
        // have changed - re-render it.
        res.send(view.section.toString());
      }
    }
  }

}