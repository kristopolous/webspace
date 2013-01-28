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
          uid: register(this),
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
      this.uid = this.get('uid');
      this.view = new v[this.get('type')](this);

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
            mthis.view.render();
          });
        });
      });
    },

    walk: function(what) {
      var el = this.view.render().$el;
      what.append(el);
      this.get('member').each(function(which) {
        which.walk(what);
      });
      this.get('next').each(function(which) {
        which.walk(what);
      });
      
/*
      console.log(
        this.get('type'),
        this.uid,
        this.get('next').map(function(which) { return which.uid })
      );
*/
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
  }),
  DocGlobal = new ShapeGroup();

  var root = new m.Category({content: "Abraham Lincoln"}),
      A = new m.Intro({content: "First Republican President"}),
      B = new m.Category(),
      C = new m.Description();

  root.next(A);
  A.next(B);
  B.member(C);
  root.walk($('#document'));

})(jQuery);
