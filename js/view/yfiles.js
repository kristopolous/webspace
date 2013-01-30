v.yfiles = {};
$(function(){
  _.each(NodeType, function(which) {
    v.yfiles[which] = v.$proto[which].extend({
    });
  });
});
