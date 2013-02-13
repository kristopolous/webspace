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
      intro = _.template($("#T-DF-Intro").html());
      section = _.template($("#T-DF-Section").html());

    swapTag(selector, "main");
    var scope = $(selector);
    //.removeAttr('id');

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
          temp.append(walker);
          walker = next;
        }

        var html = section({
          tag: tag,
          title: $(this).remove().html(),
          content: temp.html()
        });
        temp.replaceWith(html);

      });
    });

    reorder(scope);
  }

  evda.isset('display-format', function() {
    displayFormat("#document");
    if(Step > 1) {
      evda.set('arrange-on-screen');
    } else {
      addCss('gloss');
    }
  });
})();
