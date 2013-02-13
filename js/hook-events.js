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
        fontSize: "16px"
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

  function hook() {
    $("#document").draggable();
    wireLinks();
    connectToPanel();
    $(".Plus").click(toggle);
    $(window).resize(Repaint);
  }

  evda.isset('hook-events', hook);
})();
