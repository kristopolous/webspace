// file-importer
//
//  * 1. File importer
//    2. Display format
//    3. Arrange on screen
//    4. Lines and arrows
//    5. Event Hooker
//
// This file is intended to 
//
//  * import a file, either from disk or from 
//    a server-side converting script
//
//  * Put it in the input format.
//
//  * Pass it off to the display-format
//
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
      $.get('api/getpage.php?url=' + url, cb);
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

    var Step = parseInt(toLoad[2]);

    // Make sure that we stop at the appropriate point.
    evda.test('Stage', function(value, meta) {
      meta.done(Step >= value);
    });

    if(Loader[engine]) {
      Loader[engine](url, Loader.$done);
    } else {
      $(document.body).html($("#T-Help").html());
    }
  });
})();
