// lib.js
//
// Global function helpers that aren't in a specific closure.


// _.attr
//
// A helper hooked on underscore that will
// explicitly call setAttribute on a node in
// pure DOM, to make things work
_.attr = function(node, obj) {
  _.each(obj, function(value, key) {
    node.setAttribute(key, value);
  });
  return node;
}


// addCss
//
// Inject a css file into the dom by filename
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
// to be used for class inheritance in the model
//
// see http://en.wikipedia.org/wiki/Decorator_pattern
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
// Look in file-importer for the hook.
//
function nextStage() {
  var 
    current = Event.get("Stage"),
    attempt = Event.incr("Stage");

  return attempt > current;
}


// getTemplate
//
// Gets the template based on the stage name
// and the shape
function getTemplate(stage, shape) {
  return _.template(
    $([ 
      "#templateList-" + stage,
      ".template-" + shape
    ].join(' ')).html()
  );
}


// dom2Params
//
// Take a dom node in the input format and then
// determine what part of the markup maps over
// to our model. 
//
// Create a Javascript object for that, but not 
// an instance of any specific model.
//
// Return that object, which is a value argument
// for creating a model instance.
function dom2Params(dom) {
  var options = {};

  // Extract the label ... if any
  if(dom.hasAttribute('title')) {
    options.label = dom.getAttribute('title');
  }

  options.content = dom.innerHTML;

  return options;
}


// dom2Members
//
// 1. Take a DOM node's children, 
// 2. Create base level Description nodes from them
// 3. Encapsulate this in a ShapeGroup
//
// The ShapeGroup can then be used as the member option
// in another Shape declaration.
function dom2Members(dom) {
  return new ShapeGroup(
    $("p, li", dom).map(function(){ 
      return new Description(dom2Params(this));
    })
  );
}

