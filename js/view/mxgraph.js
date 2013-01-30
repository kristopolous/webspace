v.mx = {};
$(function(){

  var graph, global_parent; 

  var pos = (function() {
    var x = 0, y = 0;
    return function() {
      return [(x += 10), (y += 10), 40, 40];
    }
  })();


  function content(array) {
    var ret = [];
    
    _.each(array, function(row) { 
      ret.push( row.data );
    });
    
    return [ret.join(' ')];
  }

  // Mx definitions
  _.each(NodeType, function(which) {
    v.mx[which] = v.$proto[which].extend({
      render: function(container, parent){
        if(!parent) {
          parent = global_parent;
        } else {
          parent = parent.get('render');
        }
        return graph.insertVertex.apply(graph, [].concat(

          // parent, id
          [ parent, this.model.get('uid') ],

          // value
          content(this.model.get('content')),

          // x, y, width, height
          pos(),

          // style
          'ROUNDED'
        ));
      },
      initialize: function(model) {
        this.model = model;
      }
    });
  });
  
  _.extend(v.mx, {
    // Make sure we have transactional updates
    $pre: function(){ graph.getModel().beginUpdate(); },
    $post: function(){ graph.getModel().endUpdate(); },
    $init: function(){
      if (!mxClient.isBrowserSupported()) {
        mxUtils.error('Browser is not supported!', 200, false);
        return false;
      }

      graph = new mxGraph(document.getElementById('document'));
      
      // Enables rubberband selection
      new mxRubberband(graph);

      // Gets the default parent for inserting new cells. This
      // is normally the first child of the root (ie. layer 0).
      global_parent = graph.getDefaultParent();
    }
  });


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
