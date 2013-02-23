// hook-events
//
//    1. File importer
//    2. Display format
//    3. Build model
//    4. Arrange on screen
//    5. Lines and arrows
//  * 6. Event Hooker
//
// This file is intended to 
// 
//  * Wire click and drag events through the 
//    model in order to show or hide various
//    Shapes and their descendents.
//
//  * Hook viewport (browser) resize and scrolling
//    and various types of centering and 
//    fixed positioning associated with that.
//
//  * Introduce the notion of a Panel; that is
//    a parent container, that can request us
//    to do various things.
//
(function(){

  Event.when("StageName", "hook-events", function() {

    wireClickEvents();

    hookResize();

    //hookDrag();

    connectToPanel();

  })

  var Panel = {
    add: function(url){ 
      if(parent != self) {
        parent.Panel.Add({
          title: "unknown",
          url: 'proto.html?' + url
        });
      }
    }
  };

  function zoomShow(node) {
    $(node).show().animate({
      opacity: 1,
      fontSize: "14px"
    }, {
      duration: 600,
      step:Repaint
    });
  }
  function zoomHide(node) {
    $(node).animate({
      opacity: 0,
      fontSize: "0px"
    }, {
      duration: 600,
      step:Repaint,
      complete:function(){
        node.css('display', 'none');
      }
    });
  }

  function toggle(){
    var node = $(this).parent().parent().parent().next();
    if(this.hide) {
      this.innerHTML = '&#xe009;';
      zoomShow(node);
    } else {
      this.innerHTML = '&#xe008;';
      zoomHide(node);
    }
    this.hide = !this.hide;
  }

  function wireClickEvents() {
    $("a.link-source").each(function(){
      var name = this.getAttribute('href').slice(1);

      // Undecorate so that the page doesn't scroll
      // when you click.
      this.removeAttribute('href');
      var destination = $("a[name='" + name + "']").parent();

      zoomHide(destination);
      // Replace it with a click handler that
      // collapses and expands the node
      // TODO: put in model {{
      $(this).click(function(){
        if(destination.hide) {
          zoomShow(destination);
        } else {
          zoomHide(destination);
        }
        $(this).toggleClass('expanded');
        destination.hide = !destination.hide;
      });
    });
    $(".Plus").click(toggle);
  }
   
  function connectToPanel() {
    $("a[href^=#]").each(function(){
      var link = this.getAttribute('href');
      this.removeAttribute('href');

      $(this).click(function(){
        Panel.add(link);
      });
    });
  }

  // Make the title fixed AND the first section below have the right margin-top 
  // to accomodate for it
  function makeFixed() {
    var 
      node = $(".category-group-super.h1"),
      necessaryMargin = $(node).height();

    // Set the node to be fixed and in the middle
    node.css({
      top: 0,
      position: 'fixed',
      width: "100%"
    });

    // Move the section group up.
    node.next().css('margin-top', necessaryMargin);

    $(window).scroll(function(){
      $(".category-group-super.h1").css('top', - $(this).scrollTop());
    }); 

  }

  function hookResize() {
    $("#document").draggable();
    $(window).resize(Repaint);
    makeFixed();
  }

})();
