v.plumb = {};
$(function(){
  _.each(NodeType, function(which) {
    v.plumb[which] = Backbone.View.extend({
      render: function(container, parent){ },
      initialize: function(model) {
        this.model = model;
      }
    });
  });
});
