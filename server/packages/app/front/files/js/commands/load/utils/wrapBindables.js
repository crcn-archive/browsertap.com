var bindable = require("bindable");

module.exports = function (obj) {
  return _copy(obj);
}



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
    clone[i] = value[i];
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


function _copyBindableCollection (value) {

  var clone = _clone(value), 
  rep = new bindable.Collection(clone.__source);

  var rep = _copyNonIntersectingProperties(clone, rep);

  rep.__wrapped = true;

  _syncRemoteBindable(clone, rep);


  return rep;
}

function _copyBindable (value) {

  var clone = _clone(value);

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