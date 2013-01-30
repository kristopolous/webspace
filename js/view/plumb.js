v.plumb = {};
$(function(){
  _.each(NodeType, function(which) {
    v.plumb[which] = v.$proto[which].extend({
    });
  });

  _.extend(v.plumb, {
    $init: function(){
      jsPlumb.setRenderMode(jsPlumb.CANVAS);
    }
  });

});
