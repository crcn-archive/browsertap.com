var Fiber = require("fibers"),
_ = require("underscore");

module.exports = function (app) {
  app.utils = {
    fiberize: function (obj) {
      if (!app.get("config.fibers") || !obj.fiberize) return;
      for (var i = obj.fiberize.length; i--;) {
        var fnName = obj.fiberize[i];
        obj[fnName + "Sync"] = _fiberize(_.bind(obj[fnName], obj));
      }
    }
  };
}


function _fiberize (fn) {  

  return function () {
    var args = Array.prototype.slice.call(arguments, 0);

    var fiber = Fiber.current,
    next = function(){},
    ret;

    if (args.length && typeof args[args.length - 1] == "function") {
      next = args.pop();
    }

    fn.apply(this, args.concat(function (err, content) {
      if(err) throw new Error(err);
      ret = content;
      next(null, content);
      fiber.run();
    }));

    Fiber.yield();
    return ret;
  };
}