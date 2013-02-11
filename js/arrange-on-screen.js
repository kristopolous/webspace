(function(){
  var templateMap = {};

  // This makes sure that the tree remains balanced
  // it works off tags
  function balance(tag) {
    var widthList = $(tag).map(function(){ return $(this).width() }),
        docWidth = $(document).width() / 2,
        widest = widthList.sort()[widthList.length - 1];
    
    $(tag).each(function(){
      // First calculate how much we need to go over.
      var offset = widest - $(this).width();

      // Now we flush left or right depending on the offset
      // with respect to the document.
      if($(this).offset().left > docWidth) {
        this.style.paddingRight = offset;
      } else {
        this.style.paddingLeft = offset;
      }
    });
  }

  function hooks() {
    balance('section');
  }

  function stagnatePaths() {
    var multiplier = 3;
    $("ul").each(function(){
      var left = 0;
      $("> li", this).each(function(){
        left ++;
        this.style.marginLeft = multiplier * left + 'em';
      });
    });
  }

  function drawCircles() {
    $("a").each(function(){
      if(this.hasAttribute('href') && this.getAttribute('href').substr(0, 1) == '#') {
        $(this).addClass('circle');
      };
    });
  }

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
          $("<div />")
            .addClass("h" + i)
            .addClass("category-group-super")
            .append(replacer)
        );
      });
    }
  }

  // These are needed to make the flow of the LHS proper while also keeping
  // the $().height() returning a valid number.
  function wrapAsides() {
    $("aside").each(function(){
      $(this).replaceWith(templateMap.aside({
        content: this.innerHTML
      }));
    });
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
    wrapAsides();
    drawCircles();
    hooks();
    stagnatePaths();
//    $(document.body).addClass("debug");
  }

  $(function(){
    templateMap = {
      section: _.template($("#T-A-Section").html()),
      category: _.template($("#T-A-CategoryContainer").html()),
      aside: _.template($("#T-A-AsideContainer").html())
    };

    evda.isset('arrange-on-screen', arrange);
  });
})();
