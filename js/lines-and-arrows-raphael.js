(function(){
  var back;

  function line(from, to) {
    back.path(_.flatten([ "M", from, 'l', to ]).join(' '));
  }

  function createBus(){
    $(".description").each(function() {
      line(
        _.values($(this).offset()).reverse(),
        [0, $(this).height()]
      );
    });
  }

  function scaffold(){
    back = Raphael(0, 0, 
      $(document).width(),
      $(document).height());

    createBus();
    if(Step > 3) {
      event.set('hook-events');
    }
  }

  setTimeout(function(){
    event.isset('lines-and-arrows', scaffold);
  }, 400);
})();
