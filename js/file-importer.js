// file-importer
//
//  * 1. File importer
//    2. Display format
//    3. Build model
//    4. Arrange on screen
//    5. Lines and arrows
//    6. Event Hooker
//
// This file is intended to 
//
//  * Import a file, either from disk or from 
//    a server-side converting script
//
//  * Put it in the input format.
(function(){

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
      $.get('api/wikipedia_import.php?url=' + url, cb);
    },

    $done: function (data) {
      $("#document").replaceWith(data);

      nextStage();
    }
  };
  
  $(function(){
    var 
      toLoad = window.location.search.slice(1).split('|'),
      engine = toLoad[0],
      url = toLoad[1];

    Event.set('StageMax', parseInt(toLoad[2]));

    log("Loading document");

    if(Loader[engine]) {
      Loader[engine](url, Loader.$done);
    } else {
      $(document.body).html($("#T-Help").html());
    }
  });

})();
