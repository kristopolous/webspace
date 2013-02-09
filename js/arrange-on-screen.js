(function(){
  var templateMap = {};

  function wrapCategories() {
    var first, nodeList = [], replacer;

    for(var i = 1; i <= 6; i++) {

      $("h" + i).each(function(){
        // Because this could be the first child, we place a dummy
        // node before it.
        first = $("<div />").insertBefore(this);

        // Then we initialize the node list to just be it
        nodeList = [this];

        // and an intro container if it does exist.
        var next = $(this).next();
        if (next.hasClass('intro')) {
          nodeList.push(next.get(0));
        }
      
        // now we map everything to the replacer 
        replacer = $("<div />").addClass('category-group');
        _.each(nodeList, function(node) {
          replacer.append($(node).remove());
        });

        // and finally replace our dummy
        first.replaceWith(
          $("<div />").addClass("category-group-super").append(replacer)
        );
      });
    }
  }

  // by now we know that there is a main of id document
  function arrange() {

    // This is where we make sure that our document hierarchy is strict.
    // Our sections of the same height should be in a section container,
    // which has the proper overflow rules.
    
    var first, nodeList = [], replacer;
    // There is only one hr per article
    // TODO: inline-subdocumenting.
    $("h1 ~ section").each(function(){
      if (!first) {
        first = this.previousSibling;
      }
      nodeList.push(this);
    })
    replacer = $("<div />").addClass('section-group')

    _.each(nodeList, function(node) {
      replacer.append($(node).remove());
    });

    replacer.insertAfter(first);

    // You do this last because you need the hierarchy.
    wrapCategories();
  }

  $(function(){
    templateMap = {
      section: _.template($("#T-A-Section").html()),
      category: _.template($("#T-A-CategoryContainer").html())
    };

    evda.isset('arrange-on-screen', arrange);
  });
})();
