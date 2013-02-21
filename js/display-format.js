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


  // =======================================
  // suck*
  // =======================================
  //
  // The colorfully named suck* functions grab
  // content from the dom in the input format
  // and then create model abstractions based on
  // them with (in principle)
  // 
  //  * no information loss
  //
  //  * sibling and parenting preserved
  //


  // suckParams
  //
  // Take a dom node in the input format and then
  // determine what part of the markup maps over
  // to our model. 
  //
  // Create a Javascript object for that, but not 
  // an instance of any specific model.
  //
  // Return that object, which is a value argument
  // for creating a model instance.
  function suckParams(dom) {
    var options = {
      'content': $.trim(dom.innerHTML)
    };

    // Extract the label ... if any
    if(dom.hasAttribute('title')) {
      options.label = dom.getAttribute('title');
    }

    return options;
  }

  // suckGroup
  //
  // Given a dom node, this function tries to
  // find everything that would constitue a 
  // description node (ie, content) and create
  // new nodes based on that.
  //
  // 1. Take a DOM node's children, 
  // 2. Create base level Description nodes from them
  // 3. Encapsulate this in a ShapeGroup
  //
  // it returns a ShapeGroup of those.
  function suckGroup(dom) {
    var lastShape = false;

    return new ShapeGroup(
      $("> p, > li", dom).map(function(){ 

        var 
          currentShape, 

          // Set up the obvious content
          options = suckParams(this);

        // If a shape already existed then
        // we can add it as our previous
        if(lastShape) {
          options.previous = lastShape;
        }

        currentShape = new Description(options);

        // Take the previous and add us as the next
        if(lastShape) {
          lastShape.set('next', currentShape);
        }

        // And finally, move the pointer forward
        lastShape = currentShape;
        
        // and then dump our contents
//        $(this).remove();

        // Then return it for the map
        return currentShape;
      })
    );
  }


  // suckName
  //
  // This finds if there is an
  //
  // <a name=blah>
  //
  // within a dom and if so it returns it as the name
  function suckName(dom) {
    var name = false;

    $("a", dom).filter(function(){
      return this.hasAttribute('name')
    }).each(function(){

      // only take the first
      if(!name) {
        name = this.getAttribute('name');
        assert(this.innerHTML, '', "name to be sucked is empty");
//        $(this).remove();
      }
    });
    return name;
  }


  // suckMap
  //
  // This function uses an associative array in order to
  // create objects in the model that correspond to a 
  // a certain selector.
  //
  // The format of the map is 
  // {
  //    (Shape): (jquery selector)
  // }
  function suckMap(map, scope) {
    _.each(map, function(selector, type) {
      $(selector, scope).each(function(){
        new self[type](_.extend(
          // Start off with our name and children
          {
            name: suckName(this),
            member: suckGroup(this)
          },

          // then combine it with ourselves
          suckParams(this)
        ));
      });
    });
  }


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
  function createCategories(scope){
    // Find all nodes between two H* tags
    //
    // Note: Always get the next sibling PRIOR to insertion
    // or else the nextSibling walking will not work.
    var 
      tag, 
      type;

    // TODO This needs to recursively create
    // the document hierarchy somehow.
    for(var i = 6; i > 0; i--) {
      tag = 'H' + i;

      // The h1 tag is the title of the document
      // which is a special shape.
      if(i == 1) {
        type = "Title";
      } else {
        type = "Category";
      }

      $(tag, scope).each(function(){
        var 
          next,
          temp = $("<div />").insertBefore(this),
          walker = this.nextSibling;

        // Construct a collection of the children
        // (as in a description collection) and then
        // create a group of them, making it the member
        // of the category node that we are dealing with.
        while(walker && walker.nodeName.slice(0,1) != 'H') {
          next = walker.nextSibling;

          // Remove the node from the dom as
          // as put it in the model
          temp.append($(walker));//.remove());
          walker = next;
        }

        new self[type](_.extend(
          // Start off with our tag name and children
          { tag: tag, member: suckGroup(temp) },

          // then combine it with ourselves
          suckParams(this)
        ));

        // After getting all the children and our
        // selfs we can finally remove ourselves
//        $(this).remove();

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

