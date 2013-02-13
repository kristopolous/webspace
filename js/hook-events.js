(function(){

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

  function toggle(){
    var node = $(this).parent().parent().parent().next();
    if(this.hide) {
      this.innerHTML = '&#xe009;';
      $(node).show().animate({
        opacity: 1,
        fontSize: "14px"
      }, {
        duration: 600,
        step:Repaint
      });
    } else {
      this.innerHTML = '&#xe008;';
      $(node).animate({
        opacity: 0,
        fontSize: "0px"
      }, {
        duration: 600,
        step:Repaint
      }, function(){
        node.css('display', 'none');
      });
    }
    this.hide = !this.hide;
  }
  function wireLinks() {
    $("a.link-source").each(function(){
      var name = this.getAttribute('href').slice(1);

      // Undecorate so that the page doesn't scroll
      // when you click.
      this.removeAttribute('href');
      var destination = $("a[name='" + name + "']").parent();

      destination.hide();
      // Replace it with a click handler that
      // collapses and expands the node
      // TODO: put in model {{
      $(this).click(function(){
        if(destination.hide) {
          destination.slideDown();
        } else {
          destination.slideUp();
        }
        $(this).toggleClass('expanded');
        destination.hide = !destination.hide;
      });
    });
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

  function hook() {
    $("#document").draggable();
    wireLinks();
    connectToPanel();
    $(".Plus").click(toggle);
    $(window).resize(Repaint);
    makeFixed();
  }

  evda.isset('hook-events', hook);
})();
