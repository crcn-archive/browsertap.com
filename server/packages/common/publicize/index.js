var traverse = require("traverse"),
_            = require("underscore");

exports.load = function () {
  return publicize;
}

function publicize (object) {
  return copy(object);
}

/**
 */

function cloneObject (context) {
  var clone = {}
  for (var property in context) {
    copyTo(context, property, clone);
  }
  return clone;
}

/**
 */

function cloneArray (context) {
  var clone = new Array(context.length);
  for (var i = context.length; i--;) {
    clone[i] = copy(context[i]);
  }
  return clone;
}

/**
 */

function copy (value, context) {

  var t = typeof value;

  if (t === "function") {
    value =  _.bind(value, context);
  } else if (t === "object") {
    if (t.constructor === Array) {
      value = cloneArray(value);
    } else {
      value = cloneObject(value);
    }
  }

  return value;
}

/**
 */

function copyTo (context, property, clone) {
  if (canCopy(property, context)) {
    clone[property] = copy(context[property]);
  } else {
  }
}

/**
 */

function canCopy (property, context) {

  var pubProps = findPublicProperties(context);

  return property.substr(0,1) !== "_" 
  && ~pubProps.public.indexOf(property) && 
  !~pubProps.private.indexOf(property);
}

/**
 */

function findPublicProperties (context) {
  var ctx = context.constructor.prototype;
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
