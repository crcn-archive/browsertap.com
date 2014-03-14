var bindable = require("bindable");

module.exports = function (obj) {
  return _copy(obj);
}


/*var obj = module.exports({
  __isBindableCollection: true,
  on: function(){},
  _source: [
    {
      __isBindable: true,
      __context: { name: "abba" },
      on: function(){},
    }
  ]
});

console.log(obj);*/


function _clone (obj) {
  var clone = {};
  for (var property in obj) {
    clone[property] = _copy(obj[property], obj);
  }
  return clone;
}

function _copyArray (value) {
  var clone = new Array(value.length);
  for (var i = value.length; i--;) {
    clone[i] = _copy(value[i]);
  }
  return clone;
}

function _copy (value, context) {
  var t = typeof value;

  if (!value) return value;

  if (t === "function") {
    return _copyFn(value, context);
  } else if (t === "object") {
    if (Object.prototype.toString.call(value) === "[object Array]") {
      return _copyArray(value);
    } else {
      if (value.__wrapped) {
        return value;
      }
      if (value.__isBindableCollection) {
        return _copyBindableCollection(value);
      } else if (value.__isBindable) {
        return _copyBindable(value);
      } else {
        return _clone(value);
      }
    }
  }

  return value;
}

function _copyFn (oldFn, context) {
  return function () {

    var args = Array.prototype.slice.call(arguments, 0),
    next = args.length ? typeof args[args.length - 1] === "function" ? args.pop() : null : null;

    if (next) {
      args.push(function () {
        var nargs = Array.prototype.slice.call(arguments, 0).map(_copy);
        next.apply(this, nargs);
      })
    }

    oldFn.apply(context, args);
  };
}


function _copyBindableCollection (remote) {

  var clone = _clone(remote),
  rep = new bindable.Collection(clone._source);

  var rep = _copyNonIntersectingProperties(clone, rep);

  rep.__wrapped = true;

  _syncRemoteBindable(clone, rep);

  remote.on("insert", function (item) {
    rep.push(_copy(item));
  });

  function removeItem (item) {
    item = _copy(item);
    var _id = item.get("_id");
    var item = rep.filter(function (model) {
      return model.get("_id") === _id;
    }).pop();

    if (item) rep.splice(rep.indexOf(item), 1);
  }

  remote.on("remove", removeItem);

  remote.on("replace", function (newItems, oldItems) {
    oldItems.forEach(removeItem);
  })


  return rep;
}

function _copyBindable (remote) {

  var clone = _clone(remote);

  var rep = _copyNonIntersectingProperties(clone, new bindable.Object(clone.__context));

  rep.__wrapped = true;

  _syncRemoteBindable(clone, rep);

  return rep;
}

function _syncRemoteBindable (remote, local) {

  var watchCache = {}, ctx = {};

  remote.on("change", function (key, value) {
    if (value !== local.get(key)) {
      local.set(key, ctx[key] = value);
    }
  });

  local.on("change", function (key, value) {
    if (ctx[key] === value) return;
    ctx[key] = value;
    remote.set(key, value);
  });

  local.on("watching", function (property) {


    var path = property.join(".");

    if (watchCache[path]) return;
    watchCache[path] = true;

    remote.bind(path, function (value) {
      if (local.get(path) !== value) {
        local.set(path, ctx[path] = value);
      }
    });
  });
}


function _copyNonIntersectingProperties (from, to) {
  for (var property in from) {
    if (to[property]) continue;
    to[property] = _copy(from[property]);
  }
  return to;
}


function _makeAsync (property, context) {
  var oldFn = context[property];
  context[property] = function () {
    oldFn.apply(context, arguments);
    return {
      dispose: function () {

      }
    }
  }
}
