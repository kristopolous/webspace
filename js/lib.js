var evda = EvDa(),
  Step = 0,
  slice = Array.prototype.slice,
  NodeType = [ "Category", "Aside", "Description", "Intro", "Path", "Procedure" ],
  AnchorMap = {},
  // defined in lines and arrows
  Repaint = function(){},
  ColorList = [
    "#647D7A"
  ];

_.attr = function(node, obj) {
  _.each(obj, function(value, key) {
    node.setAttribute(key, value);
  });
  return node;
}

function addCss(file) {
  var css = document.createElement("link");

  document.getElementsByTagName("head")[0].appendChild(
    _.attr(css, {
      rel: 'stylesheet',
      type: 'text/css',
      href: 'css/' + file + '.css'
    })
  );
}

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

// Find the depth of a node in a document
function Depth(dom) {
  var 
    depth = 0,
    el = dom;

  while (el != document.body) {
    depth++;
    el = el.parentNode;
  }
  return depth;
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
  if(v.use.$init) {
    v.use.$init();
  }
  ev.set('view');
}

