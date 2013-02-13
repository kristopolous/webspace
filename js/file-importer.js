// file-importer's job is to import a file, either
// from disk or from a converter and put it into
// the input-format.
//
// After it is done it calls the display-format.
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

      if(Step > 0) {
        evda.set('display-format');
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
