// arrange-on-screen
//
//    1. File importer
//    2. Display format
//    3. Build model
//  * 4. Arrange on screen
//    5. Lines and arrows
//    6. Event Hooker
//
// This file is intended to 
// 
//  * Take the models created by the display format 
//
//  * Add the necessary CSS and HTML layout
//    tricks needed to arrange them on the 
//    screen in the necessary document flow.
//
// TODO: Most of this stuff should be put into the 
//  MV* style way of doing things as opposed to
//  re-entering the dom as the data-store every time.
(function(){

  Event.when("StageName", "arrange-on-screen", function(stage) {

    addCss('reset');
    addCss('arrange-on-screen');

    templateMap = getAllTemplates(stage);

    // We copy the data back into the document and work with that.
    var scope = "#document"; 
    $(scope).html( $("#data").html() );

    wrapSections(scope);
    wrapCategories(scope);
    wrapAsides(scope);

    drawCircles(scope);

    balanceTree(scope);
    stagnatePaths(scope);

    nextStage();

    // There is only one hr per article
    // TODO: inline-subdocumenting.

  });

  var templateMap = {};

  // This makes sure that the tree remains balanced
  // it works off tags
  function balance(tag, scope) {
    var 
      nodeList = $(tag, scope), 
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

  function balanceTree(scope) {
    balance('section', scope);
  }

  function stagnatePaths(scope) {
    var multiplier = 3;

    $("ul", scope).each(function(){
      var left = 0;
      $("> li", this).each(function(){
        left ++;
        this.style.marginLeft = multiplier * left + 'em';
      });
    });
  }

  function drawCircles(scope) {
    $(Sel.CircleSource, scope).addClass('circle');
  }

  function wrapCategories(scope) {
    var shape;

    for(var i = 1; i <= 6; i++) {

      // There's semantic differences in how these
      // are ordered on screen. So the Title and
      // Category must be distinguished.
      if (i == 1) {
        shape = 'Title';
      } else {
        shape = 'Category';
      }

      $("h" + i, scope).each(function(){
        // Because this could be the first child, we place a dummy
        // node before it.
        var 
          dummy = $("<div />").insertBefore(this),

          next = $(this).next(),
        
          label,

          // The Block (as in the Syntactical Block)
          block;  

        // Add the Intro Block if it exists.
        if (next.hasClass('intro')) {
          block = next.remove().html();

          // According to the Syntax (see wiki), Labels come after Intros
          // Since we test for labels after this block, move the next pointer
          // forward.
          next = next.next();
        }
      
        // Add the Label if it exists.
        if (next.hasClass('label')) {
          label = next.remove().html();
        }

        // Replace our dummy container
        dummy.replaceWith(
          templateMap[shape]({
            tag: "h" + i,
            content: $(this).remove().html(),
            label: label,
            block: block
          })
        );
      });
    }

    $(".section-group", scope).each(function(){
      var before = $(this).prev();

      if(before) {
        before.addClass('center-expand');
      }
    });
  }

  // These are needed to make the flow of the LHS proper while also keeping
  // the $().height() returning a valid number.
  function wrapAsides(scope) {
    $("aside a.link-destination", scope).each(function(){
      var name = this.getAttribute('name');
      
      // TODO: put in model {{
      var 
        source = $(AnchorMap[name].source[0]),
        content = $(AnchorMap[name].destination[0]);
      // }} Put in model.
      
      $(source).replaceWith(templateMap.Aside({
        content: content.remove().html(),
        source: source.html()
      }));
    });
  }

  function wrapSections(scope) {
    // This is where we make sure that our document hierarchy is strict.
    // Our sections of the same height should be in a section container,
    // which has the proper overflow rules.
    
    var replacer;

    $("h3 + .description", scope).each(function() {
      $(this.parentNode).addClass("pull-left");
    });

    $("section", scope).each(function(){
      if(!$(this.parentNode).hasClass('section-group') ) {
        replacer = $("<div />").addClass('section-group');
        $(this).before(replacer);

        replacer.html($(this.parentNode).children("section").remove());
      }
    });
  }
})();
