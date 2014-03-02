var collection = {};


var decorator = {
  getOptions: function(view) {
    return true;
  }, 
  decorate: function (view) {
    
    var name = view.name;

    if(!collection[name]) {
      collection[name] = [];
    }

    collection[name].push(view);
  }
}

module.exports = function(app) {
  app.decorator(decorator);

  app.getViewsByName = function(name) {
    return collection[name] || [];
  };

  app.getViewByName = function(name) {
    var views = app.getViewsByName(name);
    return views[views.length - 1];
  };
}