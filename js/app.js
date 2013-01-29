var register = (function(){
  var UID = 0;
  return function (what) {
    register[UID] = what;
    return UID++;
  };
})();
        
// inner spans for view
var m = {}, u = 0;
(function ($) {
  var Shape = m.Shape = Backbone.Model.extend({
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
            container: new ShapeGroup(),
            member: new ShapeGroup(),
          // }

          label: "",
          content: "",
        // }

          visible: true,
          
      };
    },

    initialize: function() {
      var mthis = this;

      // Register tricks that permit for someone to drop
      // their own id
      if(this.get('uid')) {
        register[this.get('uid')] = this;
      } else {
        this.set('uid', register(this));
      }
      this.uid = this.get('uid');

      this.view = new v.use[this.get('type')](this);

      // Sets up the previous next add/remove hierarchy
      // and events
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
  _.each(['previous', 'next', 'member', 'container'], function(which) {
    Shape.prototype[which] = function(what) {
      return what ? 
        this.get(which).add(what) :
        this.get(which);
    }
  });

  _.each(NodeType, function(which) {
    m[which] = Shape.extend({
      defaults: function(){
        return inheritAndAdd(Shape, {type: which});
      }
    });
  });


  eval(_inject('i'));

  // We need a group of groups.
  var ShapeGroup = Backbone.Collection.extend({
    model: Shape
  });

})(jQuery);

function render(node) {
  if(v.use.$pre) {
    v.use.$pre();
  }
  try {
    node.walk($('#document'));
  } finally {
    if(v.use.$post) {
      v.use.$post();
    }
  }
}
function parse(payload) {
  var root;
  _.each(payload, function(shape) {
    // This means it's the root node.
    if(shape.parent == shape.uid) {
      root = new m[shape.type](shape);

      // Otherwise we should have seen the parent
      // before the child (if the parser did its work, that is)
    } else {
      register[shape.parent].member(new m[shape.type](shape));
    }
  });
  render(root);
}

$(function(){
  setView('html');
  parse(payload);
});
