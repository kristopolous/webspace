v.yfiles = {};
$(function(){
  _.each(NodeType, function(which) {
    v.yfiles[which] = Backbone.View.extend({
      render: function(container, parent){ },
      initialize: function(model) {
        this.model = model;
      }
    });
  });
});
