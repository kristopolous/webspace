// display-format
//
//    1. File importer
//  * 2. Display format
//    3. Build model
//    4. Arrange on screen
//    5. Lines and arrows
//    6. Event Hooker
//
// This file is intended to 
//
// Take content arranged in a DOM node in the Input Format
// (as defined in the wiki) and then do two things:
//
//  * Derive shapes from the input format and place it 
//    in the model.
//
//  * Convert the input format (through the model) to
//    the Display Format and then display THAT on the
//    screen instead.
//
//
// idea:
//  have well-formed html in the member and content
//  nodes and then break it down recursively.
(function(){

  var templateMap = {};
  // This eventually needs to be server-side
  Event.when("StageName", "display-format", function(stage) {
    templateMap = getAllTemplates(stage);
    displayFormat("#document");

    // Now we remove the well structured display-formatted document
    // and place it into the data node. this will be ther reference
    // for the rest of the scaffolding.
    $("#data").html( $("#document").html() );
    $("#document").empty();

    /*
    var selector = "#document";

    suckMap({
      Aside: '.aside',
      Path: 'ul',
      Procedure: 'ol'
    }, $(selector));

    createCategories($(selector));
    */
      
    if(! nextStage()) {
      addCssfile('gloss');
    }
  });


  // swapTag
  // 
  // Swap tag takes a number of tags mapped
  // by a jquery selector and then changes their
  // tags to a newTag name. 
  //
  // Swap DESTROYS THINGS AND REPLACES THEM
  // That means your jquery selectors will be
  // shot to hell.
  //
  // It also means that you should run this
  // early early early
  //
  // A similar function is implemented in the
  // PHP importer.
  function swapTag(selector, newTag) {
    return $(selector).map(function(what, node) {
      var 
        html = $(node).html(),
        replace = $("<" + newTag + ">").html(html);

      // Set up the new dom node
      _.attr(
        replace.get(0),
        // with the attributes from the old one
        _.attr(node)
      );

      $(node).replaceWith(replace);
    });
  }
    


  // createCategories
  //
  // Use the HTML4 implicit document flow
  // to:
  //
  //  * Create category shapes
  //
  //  * Assign them membership rules based
  //    on the vertical positioning of where
  //    they will live in the VizDocument
  //
  function createSections(scope){
    // Find all nodes between two H* tags
    //
    // Note: Always get the next sibling PRIOR to insertion
    // or else the nextSibling walking will not work.
    var 
      contentType,
      tag;

    // TODO This needs to recursively create
    // the document hierarchy somehow.
    for(var i = 6; i > 0; i--) {
      tag = 'H' + i;

      // The h1 tag is the title of the document
      // which is a special shape.
      if(i == 1) {
        contentType = 'intro';
      } else {
        contentType = 'description';
      }

      $(tag, scope).each(function(){
        var 
          next,
          html,
          section = $("<div />"),
          temp = $("<div />").insertBefore(this),
          label,
          walker = this.nextSibling;

        if(this.hasAttribute('title')) {
          label = this.getAttribute('title');
        }

        // Construct a collection of the children
        // (as in a description collection) and then
        // create a group of them, making it the member
        // of the category node that we are dealing with.
        while(walker && walker.nodeName.slice(0,1) != 'H') {
          next = walker.nextSibling;

          // Remove the node from the dom as
          // as put it in the model
          if(walker.nodeName == "SECTION") {
            section.append(walker);
          } else {
            temp.append(walker);//.remove());
          }
          walker = next;
        }

        html = templateMap.Category({
          tag: tag,
          label: label,
          type: contentType,
          title: $(this).remove().html(),
          section: section.html(),
          content: temp.html()
        });
        temp.replaceWith(html);

        // After getting all the children and our
        // selfs we can finally remove ourselves
//        $(this).remove();

      });

      // Unwrap double-dipped descriptions
      $(".description", scope).each(function(){
        if($(this).children(":first").hasClass("description")) {
          var html = $(this).children(":first").remove().html();
          this.innerHTML = html;
        }
      });
    };
  }

  self.displayFormat = function (selector) {

    swapTag(selector, "main");
    var scope = $(selector);
    //.removeAttr('id');

    swapTag(".aside", "aside");
    swapTag(".media", "figure");
    swapTag(".media-caption", "figcaption");

    createSections(scope);
    /*
    // Find the intro
    $("h1", scope).each(function(){
      var 
        temp = $("<div />"),
        next,
        walker = this.nextSibling;

      while(walker && walker.nodeName != 'H2') {
        next = walker.nextSibling;
        temp.append(walker);
        walker = next;
      }

      var html = templateMap.Intro({
        content: temp.html()
      });
      temp.replaceWith(html).insertAfter(this);
    });

    // Find all nodes between two h2 nodes
    //
    // Note: Always get the next sibling PRIOR to insertion
    // or else the nextSibling walking will not work.
    _.each(['H2', 'H3', 'H4'], function(tag) {
      $(tag, scope).each(function(){
        var 
          temp = $("<div />").insertBefore(this),
          next,
          walker = this.nextSibling;

        while(walker && walker.nodeName != tag) {
          next = walker.nextSibling;
          temp.append(walker);
          walker = next;
        }

        var html = templateMap.Section({
          tag: tag,
          title: $(this).remove().html(),
          content: temp.html()
        });
        temp.replaceWith(html);

      });
    });
    */

    reorder(scope);
  }
  function reorder(scope) {
    // Find all of the anchor tags and break them up into
    // source destination tuples.
    //
    // one destination can have many sources, but we play
    // dumb to make life easy.
    //
    // These are all the inline links
    $('a[href^="#"]').each(function(){

      var 
        href = this.getAttribute('href'),
        name = href.slice(1);

      $(this).addClass("link-source");

      // This is the parent container of the node to 
      // move adjacent. It may or may not exist.
      var matchSet = $('a[name="' + name + '"]');

      if(matchSet.length) {

        matchSet.addClass("link-destination");

        var toMove = matchSet.get(0).parentNode;

        // TODO: put in model {{
        if(!AnchorMap[name]) {
          AnchorMap[name] = { 
            link: [],
            source: [],
            destination: []
          };
        }

        AnchorMap[name].link.push(this);
        AnchorMap[name].destination.push(toMove);
        AnchorMap[name].source.push(this.parentNode);
        // }} Put in model.

        // Remove it and then place it after the links'
        // parent node ... creating adjacency.
        $(toMove).remove().insertAfter(this.parentNode);
      }
    });
  }

})();

