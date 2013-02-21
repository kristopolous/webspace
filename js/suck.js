
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

