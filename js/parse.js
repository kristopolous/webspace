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

      var href = this.getAttribute('href');

      // This is the parent container of the node to 
      // move adjacent. It may or may not exist.
      var matchSet = $('a[name="' + href.slice(1) + '"]');

      if(matchSet.length) {
        var toMove = matchSet.get(0).parentNode;

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

  // The format of the request url is
  // engine|url
  //
  // Where engine is one of
  //
  // * raw
  // * wikipedia
  //
  var Loader = {
    raw: function(url, cb) {
      $.get(url, cb);
    },

    wikipedia: function(url, cb) {
      $.get('api/getpage.php?url=' + url, cb);
    },

    $done: function (data) {
      var scope;
      $("#document").replaceWith(data);

      if(Step > 0) {
        // This gets us to a glossing point.
        displayFormat("#document");
      } else {
        return;
      }

      if(Step > 1) {
        evda.set('arrange-on-screen');
      } else {
        $(document.body).addClass('gloss');
      }
    }
  };

  $(function(){
    var 
      toLoad = window.location.search.slice(1).split('|'),
      engine = toLoad[0],
      url = toLoad[1];

    Step = parseInt(toLoad[2]);

    if(Loader[engine]) {
      Loader[engine](url, Loader.$done);
    } else {
      $(document.body).html($("#T-Help").html());
    }
  });
})();
