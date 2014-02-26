var traverse = require("traverse"),
_            = require("underscore"),
dref         = require("dref");

exports.load = function () {
  return publicize;
}

function publicize (object) {
  return copy(object);
}

/**
 */

function copyPublic (context) {
  var pub = findPublicProperties(context).public;

  var clone = {};

  for (var i = pub.length; i--;) {
    var v = dref.get(context, pub[i]);
    v = copy(v, context);
    dref.set(clone, pub[i], v);
  }

  return clone;
}

/**
 */

function cloneArray (context) {
  var clone = new Array(context.length);
  for (var i = context.length; i--;) {
    clone[i] = copyPublic(context[i]);
  }
  return clone;
}

/**
 */

function copy (value, context) {

  var t = typeof value;

  if (value == null) {
    return value;
  }

  if (t === "function") {
    var oldFn = value;
    value =  function () {
      var args = Array.prototype.slice.call(arguments, 0),
      next = args.length ? typeof args[args.length - 1] === "function" ? args.pop() : null : null;

      if (next) {
        args.push(function () {
          var nargs = Array.prototype.slice.call(arguments, 0).map(copy);
          next.apply(this, nargs);
        })
      }

      oldFn.apply(context, args);
    }
  } else if (t === "object") {
    if (t.constructor === Array) {
      value = cloneArray(value);
    } else if(String(value) === "[object Object]") {
      value = copyPublic(value);
    }
  }

  return value;
}

/**
 */

function findPublicProperties (context) {
  var ctx = context;
  var pub = [], priv = [];
  while (ctx) {
    pub = pub.concat(ctx.public || []);
    priv = priv.concat(ctx.private || []);
    ctx = ctx.constructor.parent ? ctx.constructor.parent.prototype : null;
  }

  return {
    public: pub,
    private: priv
  }
}
