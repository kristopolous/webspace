// model.js
//
// This is the file that defines the model (as in MV*)
// For the different shapes.
//
// They are put in the global namespace (self.)
var ShapeGroup;

(function () {

  // This is a registry to keep track of all
  // the models that were created.
  function register(what) {
    register[what.cid] = what;
  }

  // The base shape.
  self.Shape = Backbone.Model.extend({
    defaults: function(){
      return {
        // Ostensibly immutable {
          type: 'Shape',
        // }
        
        // Modifiable {
          // previous or next at same depth {
            previous: new ShapeGroup(),
            next: new ShapeGroup(),
          // }

          // relationship amongst depth {
            container: new ShapeGroup(),  // This is the "parent"
            member: new ShapeGroup(),     // this is the "content"
          // }

          label: "",
          content: "",
        // }

          visible: true,
          
      };
    },

    initialize: function() {
      var mthis = this;

      register(this);

      //this.view = new v.base[this.get('type')](this);

      // Sets up the previous next add/remove hierarchy
      // and events
     /*
      _.each(['add', 'remove'], function(what) {
        _.each(
          [].concat(
            permute(['container', 'member']),
            permute(['previous', 'next'])
          ), function(which) {
          mthis.get(which[0]).on(what, function(that) {
            that.get(which[1])[what](mthis);
//            mthis.view.render(what);
          });
        });
      });
      */
    },

    walk: function(what, parent, depth) {
      if(!depth) {
        depth = 0;
      }
      var mthis = this;

      this.set('render', this.view.render(what, parent, depth));

      _.each(['member','next'], function(relation) {
        mthis.get(relation).each(function(which) {
          which.walk(what, mthis, depth + 1);
        });
      });
    }
  });

  // Getters and setter 
  _.each(['previous', 'next', 'member', 'container'], function(which) {
    Shape.prototype[which] = function(what) {
      return what ? 
        this.get(which).add(what) :
        this.get(which);
    }
  });

  // Each of the shapes are the base shape with a type associated
  // with it. Inheritance is done to the prototype after this.
  _.each(ShapeType, function(which) {
    self[which] = Shape.extend({
      defaults: function(){
        return inheritAndAdd(Shape, {type: which});
      }
    });
  });

  // A ShapeGroup is a generic container
  ShapeGroup = Backbone.Collection.extend({
    model: Shape
  });

})();

function render(node) {
  node.walk($('#document'));
}

// Suck data into the model from a dom node
function model_suck(shape, dom) {
  var content = $("p, li", dom).map(function(){ 

    // Extract the label ... if any
    var options = {};
    if(this.hasAttribute('title')) {
      options.label = this.getAttribute('title');
    }
    options.content = this.innerHTML;

    return new Description(options);
  });
  _.each(content, function(what) {
    console.log(what.attributes);
  });
}

// (type) : (selector)
function suck_map(map) {
  _.each(map, function(selector, type) {
    $(selector).each(function(){
      model_suck(type, this);
    });
  });
}
