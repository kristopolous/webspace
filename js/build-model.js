// build-model
//
//    1. File importer
//    2. Display format
//  * 3. Build model
//    4. Arrange on screen
//    5. Lines and arrows
//    6. Event Hooker
//
// This file is intended to 
// 
//  * Take a well-formatted document in the
//    "#data" node of the document.body
//    and decorate it to make it easy to 
//    reference.
//
//  * Permit for helper functions including
//    typechecking to be run over the model
//
(function(){
  Event.when("StageName", "build-model", function(stage) {
    decorateDom("#data");
    nextStage();
  });

  // This our "uniqid"
  var 
    _index = 0,
    typeMap = {
      'H1': 'Title',
      'H2': 'Category',
      'H3': 'Category', 
      'H4': 'Category',
      'H5': 'Category', 
      'H6': 'Category',
      'ASIDE': 'Aside',
      'UL': 'Procedure',
      'OL': 'Path',

      'intro': 'Intro',
      'description': 'Description'
    };

  // This function sets the type of the node
  // for easy typechecking
  function setType (what) {

    if(typeMap[what.nodeName]) {
      what.viz.type = typeMap[what.nodeName];

    } else if(typeMap[what.className]) {
      what.viz.type = typeMap[what.className];

    } else if(what.nodeName == "LI") {

      // LI nodes assume the identity of their parents
      what.viz.type = typeMap[what.parentNode.nodeName];
    } else if(what.nodeName == "P" && what.parentNode.viz) {

      // Fall back to parent generally 
      what.viz.type = what.parentNode.viz.type;
    } else {

    }
  }

  // This is for easy type-checking throughout the system.
  // In the lib.js there are _.is* defined for all the known
  // shapes and types.
  _.getType = function(what) {
    if(what.viz) {
      return what.viz.type;
    } else {
      return false;
    }
  }

  // we introduce something to go in our _ scope
  // of add node
  _.addNode = function(what) {
    // First increment the counter
    _index++;

    // First the DOM node itself gets the property.
    what.viz = {
      index: _index
    };

    // Then we add the attribute, meaning that it will no longer validate
    // what.setAttribute('index', _index);

    // Now we set an entry in the global Db object
    // which is flat, unstructured data (we rely on
    // the dom for the structure) AND most of the work
    // but we have a back reference in cast things
    // become rather inaccessible
    Db [ _index ] = {
      dom: what
    };
 
    setType(what);

    // Toss back the reference
    return _index;
  }


  function decorateDom(source){
    $(source + " *").each(function(){
      _.addNode(this);
    });
  }
})();
