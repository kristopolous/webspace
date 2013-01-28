
var NodeType = [ "Category", "Aside", "Description", "Intro", "Path", "Procedure" ];

var slice = Array.prototype.slice,
  ev = EvDa();

function enum(array) {
  var ret = {};
  _.each(array, function(which) {
    ret[which] = which;
  });
}

function inheritAndAdd(type, obj) {
  return _.extend(
    {}, (
      _.isFunction(type.prototype.defaults) ?
        type.prototype.defaults() :
        type.prototype.defaults
    ),
    obj
  );
}
// see http://en.wikipedia.org/wiki/Decorator_pattern
function decorate(initial, decorator) {
  return function() {
    return decorator.call(this, initial.apply(this, slice.call(arguments)));
  }
}

// The Steinhaus-Johnson-Trotter algorithm
function permute(array) {
  // Identity
  if(array.length == 0) {
    return [];
  }
  var ret = [array],
      len = array.length,
      modlen = len - 1,
      counter = 0,
      mover = array[len - 1];

  _.each(permute(array.slice(0, -1)), function(which) {
    if(++ counter % 2) {
      for(var ix = modlen - 1; ix > (0 - 1); ix += -1) {
        ret.push(
          which.slice(0, ix).concat(
            [mover],
            which.slice(ix)
          )
        );
      }
    } else {
      for(var ix = 0; ix < (modlen + 1); ix += 1) {
        ret.push(
          which.slice(0, ix).concat(
            [mover],
            which.slice(ix)
          )
        );
      }
    }
  });

  return ret;
}

function setView(engine) {
  v.use = v[engine];
  ev.set('view');
}

var v = {};
