// display-format
//
//    1. File importer
//  * 2. Display format
//    3. Arrange on screen
//    4. Lines and arrows
//    5. Event Hooker
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
(function(){

  function swapTag(nodeList, newTag) {
    return $(nodeList).map(function(what, node) {
      var 
        html = $(node).html(),
        replace = $("<" + newTag + ">").html(html),
        replaceDOM = replace.get(0);

      _.each($(node).get(0).attributes, function(attrib) {
        replaceDOM.setAttribute(attrib.nodeName, attrib.nodeValue);
      });

      $(node).replaceWith(replace);
    });
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

  // This eventually needs to be server-side
  self.displayFormat = function (selector) {
    var 
      stage = evda('StageName'),
      intro = getTemplate(stage, "Intro"),
      section = getTemplate(stage, "Section");

    swapTag(selector, "main");
    var scope = $(selector);

    swapTag(".aside", "aside");
    swapTag(".media", "figure");
    swapTag(".media-caption", "figcaption");


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

      var html = intro({
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
          temp.append($(walker).remove());
          walker = next;
        }

        new Category(_.extend(
          // Start off with our tag name and children
          { tag: tag, member: dom2Members(temp) },

          // then combine it with ourselves
          dom2Params(this)
        ));

        
        var html = section({
          tag: tag,
          title: $(this).remove().html(),
          content: temp.html()
        });
      //  temp.replaceWith(html);
       

      });
    });

    reorder(scope);

    /*
    suck_map({
      'Aside': 'aside',
      'Description': '.description',
      'Category': 'h1, h2, h3, h4, h5, h6',
      'Path': 'ul',
      'Procedure': 'ol'
    });
    */
      
    if(! nextStage()) {
      addCssfile('gloss');
    }
  }

  evda.when("StageName", "display-format", function() {
    displayFormat("#document");
  });

})();
