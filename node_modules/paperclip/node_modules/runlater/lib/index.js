module.exports = function (batch, ms) {

  if (!batch) batch = 5;
  if (!ms) ms = 1;

  var queue = [], timer;

  return function (fn)  {


    // items to call later
    queue.push(fn);

    // timer running? don't run
    if (timer) return;

    // start the timer until there are no more items
    timer = setInterval(function () {

      // pop off the most recent items
      var fns = queue.splice(0, batch);

      // no more items? stop the timer
      if (!fns.length) {
        clearInterval(timer);
        return timer = undefined;
      }

      // run all the items in the current batch
      for (var i = 0, n = fns.length; i < n; i++) {
        fns[i]();
      }

    }, ms);
  }
}

module.exports.global = global.__runlater || (global.__runlater = module.exports());