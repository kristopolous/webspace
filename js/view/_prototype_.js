var v = {$proto: {}};
_.each(ShapeType, function(which) {
  v.$proto[which] = Backbone.View.extend({
    render: function(container, parent){ },
    initialize: function(model) {
      this.model = model;
    }
  });
});


'height width top left'
