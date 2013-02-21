// lib.js
//
// Global function helpers that aren't in a specific closure.

var slice = Array.prototype.slice;


// _.attr
//
// A helper hooked on underscore that will
// explicitly call setAttribute on a node in
// pure DOM, to make things work
_.attr = function(node, obj) {

  // If two arguments are passed then set
  // things up
  if(arguments.length == 2) {
    _.each(obj, function(value, key) {
      node.setAttribute(key, value);
    });
    return node;
  }

  // Otherwise make a map
  var map = {};
  _.each($(node).get(0).attributes, function(attrib) {
    map[attrib.nodeName] = attrib.nodeValue;
  });

  return map;
}

// This is our type check for the various shapes.
_.each(ShapeType, function(which) {
  _['is' + which] = function(what) {
    // getType is defined in the build-model
    return _.getType(what) == which;
  }
});

// addCss
//
// Inject a CSS file into the DOM by filename
// This is used so that different stages can
// have different markup.
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


// inheritAndAdd
// 
// This is for Backbone's defaults so that you
// can inherit from a parent class and then add
// a specific set of key/values for your own
// purposes.
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


// domDepth
//
// Find the depth of a node in a document
function domDepth(dom) {
  var 
    depth = 0,
    el = dom;

  while (el != document.body) {
    depth++;
    el = el.parentNode;
  }

  return depth;
}	


// decorate
//
// This is a pythonic decorator pattern that is intended
// to be used for class inheritance in the model.
//
// See http://en.wikipedia.org/wiki/Decorator_pattern
// for more information and how to use this.
function decorate(initial, decorator) {
  return function() {
    return decorator.call(
      this, initial.apply(
        this, slice.call(arguments)
      )
    );
  }
}


// permute
//
// The Steinhaus-Johnson-Trotter permutation algorithm, intended to
// do two way wiring and event hooking in the models.
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


// nextStage
//
// Attempts to go to the next stage in the course of events.
// This is dependent on the third argument in the pipe-bar.
// 
// Look in _init.js for the hook.
function nextStage() {
  var 
    current = Event.get("Stage"),
    attempt = Event.incr("Stage");

  return attempt > current;
}


// getTemplate
//
// Gets the template based on the stage name
// and the shape.
function getTemplate(stage, shape) {
  return _.template(
    $([ 
      "#templateList-" + stage,
      ".template-" + shape
    ].join(' ')).html()
  );
}


// getAllTemplates
//
// Loads all the templates for a given stage
// due to predictable naming schemes.
function getAllTemplates(stage) {
  var map = {};

  $("#templateList-" + stage + " script").each(function() {

    // 1. Take the class
    // 2. Drop the 'template-' off of it
    // 3. Join it back together
    var shapeName = this.getAttribute('class')
      .split('-')
      .slice(1)
      .join('-');

    // This is the key for our map. then we take the html
    // and pass it back in
    map[shapeName] = _.template($(this).html());

  });

  return map;
}


// log
//
// Log a message with a relative timestamp 
// and where the call was initiated from.
function log() {
  console.log.apply(this, [
    '@' +
      ((new Date() - Start) / 1000).toFixed(2) + ' ' +
      stackTrace(2,3)
        .split('/')
        .pop() +
    ':'
  ].concat(
    slice.call(arguments)
  ));
}


// stackTrace
//
// Returns a stack trace of the current call stack
// between start and stop
function stackTrace(start, stop) {
  if (arguments.length == 0) {
    start = 4;
    stop = 22;
  }

  try { 
    throw new Error(); 
  } catch (e) { 
    return(
      e.stack
        .split('\n')
        .slice(start,stop)
        .join('\n')
        .replace(/^[^@]*/mg, '')
        .replace(/\n[^@]*/mg, '\n   ')
      || e.stack);
  }
}

// assert
//
// a trivial ASSERT system that falls through
// and prints out stuff to the console when
// key !== value.
//
// Add a message for more meaningful output.
function assert(key, value, message) {
  if( key !== value ) {
    log("!failed:", message, key, value);
  }
}
