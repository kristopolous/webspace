var slice = Array.prototype.slice;

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

var register = (function(){
  var UID = 0;
  return function (what) {
    register[UID] = what;
    return UID++;
  };
})();
        
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

var v = {}, u = 0;
(function ($) {
  var Shape = v.Shape = Backbone.Model.extend({
    defaults: function(){
      return {
        // Ostensibly immutable {
          uid: register(this),
          type: 'Shape',
        // }
        
        // Modifiable {
          parent: new Group(),
          child: new Group(),
          label: "",
          content: "",
        // }

          visible: true,
          
      };
    },

    initialize: function() {
      var mthis = this;
      this.uid = this.get('uid');

      // Sets up the parent child add/remove hierarchy
      // and events
      _.each(['add', 'remove'], function(what) {
        _.each(permute(['parent', 'child']), function(which) {
          mthis.get(which[0]).on(what, function(that) {
            console.log([
              that.get('type'), that.uid,
              what, 
              which[1],
              mthis.get('type'), mthis.uid
            ].join(' '));
            that.get(which[1])[what](mthis);
          });
        });
      });
    },

    walk: function() {
      this.get('child').each(function(which) {
        which.walk();
      });
      console.log(
        this.get('type'),
        this.get('content'),
        this.uid,
        this.get('child').map(function(which) { return which.uid })
      );
    }
  });
  _.each(['parent', 'child'], function(which) {
    Shape.prototype[which] = function(what) {
      return what ? 
        this.get(which).add(what) :
        this.get(which);
    }
  });

  _.each([].concat(
    [ "Aside", "Category" ], // singletons
    [ "Description", "Intro", "Path", "Procedure" ] // Containers
  ), function(which) {
    v[which] = Shape.extend({
      defaults: function(){
        return inheritAndAdd(Shape, {type: which});
      }
    });
  });


  eval(_inject('i'));

  // We need a group of groups.
  var Group = Backbone.Collection.extend({
    model: Shape
  }),
  DocGlobal = new Group();

  var root = new v.Category(),
      A = new v.Intro(),
      B = new v.Category();

  root.child(A);
  A.child(B);
  A.child(C);
  root.walk();

})(jQuery);
