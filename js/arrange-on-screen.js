// arrange-on-screen
//
//    1. File importer
//    2. Display format
//  * 3. Arrange on screen
//    4. Lines and arrows
//    5. Event Hooker
//
// This file is intended to 
// 
//  * Take the models created by the display format 
//
//  * Add the necessary CSS and HTML layout
//    tricks needed to arrange them on the 
//    screen in the necessary document flow.
//
(function(){
  Event.when("StageName", "arrange-on-screen", function(stage) {

    addCss('reset');
    addCss('arrange-on-screen');

    _.each(ShapeType, function(shape) {
      templateMap[shape] = getTemplate(stage, shape);
    });

    reflow();

    wrapCategories();
    wrapAsides();

    drawCircles();

    balanceTree();
    stagnatePaths();

    nextStage();
  });

  var templateMap = {};

  // This makes sure that the tree remains balanced
  // it works off tags
  function balance(tag, scope) {
    var nodeList = $(tag, scope), 
        widthList,
        docWidth,
        widest,
        siblings;

    if(!nodeList.length > 0) {
      return;
    }

    // Recursively do the children then their respective parents.
    nodeList.each(function(what, that) {
      balance(tag, that);
    });

    siblings = $(nodeList.get(0)).siblings().filter("section");

    widthList = $(siblings).map(function(){ return $(this).width() }),
    docWidth = $(document).width() / 2,
    widest = widthList.sort()[widthList.length - 1];
    
    $(siblings).each(function(){
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

  function balanceTree() {
    balance('section', document.body);
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
        nodeList = [];

        // and an intro container if it does exist.
        var next = $(this).next();
        if (next.hasClass('intro')) {
          nodeList.push(next.get(0));
        }
      
        // now we map everything to the replacer 
        replacer = $("<div />");
        _.each(nodeList, function(node) {
          replacer.append($(node).remove());
        });

        // and finally replace our dummy
        first.replaceWith(templateMap.category({
          tag: "h" + i,
          content: $(this).remove().html(),
          intro: replacer.html()
        }));
      });
    }
  }

  // These are needed to make the flow of the LHS proper while also keeping
  // the $().height() returning a valid number.
  function wrapAsides() {
    $("aside a.link-destination").each(function(){
      var name = this.getAttribute('name');
      
      // TODO: put in model {{
      var 
        source = $(AnchorMap[name].source[0]),
        content = $(AnchorMap[name].destination[0]);
      // }} Put in model.
      
      $(source).replaceWith(templateMap.aside({
        content: content.remove().html(),
        source: source.html()
      }));
    });
  }

  function reflow() {
    // This is where we make sure that our document hierarchy is strict.
    // Our sections of the same height should be in a section container,
    // which has the proper overflow rules.
    
    var first, 
        nodeList = [], 
        replacer;

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
  }


})();
