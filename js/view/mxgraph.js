v.mx = {};
$(function(){

  if (!mxClient.isBrowserSupported()) {
    mxUtils.error('Browser is not supported!', 200, false);
    return false;
  }

  var graph = new mxGraph(document.getElementById('document'));

  // Mx definitions
  _.each(NodeType, function(which) {
    v.mx[which] = Backbone.View.extend({
      tagName: 'div',
      className: which,
      template: $("#" + which).html(),
      render: function(){
        var tmpl = _.template(this.template); //tmpl is a function that takes a JSON and returns html

        this.$el.html(tmpl(
          this.model.attributes
        )); //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        return this;
      },
      initialize: function(model) {
        this.model = model;
      }
    });
  });
  
  _.extend(v.mx, {
    // Make sure we have transactional updates
    $pre: function(){ graph.getModel().beginUpdate(); },
    $post: function(){ graph.getModel().endUpdate(); }
  });

  // Enables rubberband selection
  new mxRubberband(graph);

  // Gets the default parent for inserting new cells. This
  // is normally the first child of the root (ie. layer 0).
  var parent = graph.getDefaultParent();

/*
  // Adds cells to the model in a single step
  try {
     var v1 = graph.insertVertex(parent, null,
              'Hello,', 20, 20, 80, 30);
     var v2 = graph.insertVertex(parent, null,
              'World!', 200, 150, 80, 30);
     var e1 = graph.insertEdge(parent, null, '', v1, v2);
  } finally {
     // Updates the display
  }
*/
});
