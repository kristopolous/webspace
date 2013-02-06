var Control = {
  zoom: 1,
  offset: 0,
  last: 0,
  zoomTo: function(number) {
    $("iframe").css({
      height: (1 / number * 100) + "%",
      width: (1 / number * 100) + "%",
      zoom: number,
      "-moz-transform": "scale(" + number + ")",
      "-o-transform": "scale(" + number + ")",
      "-webkit-transform": "scale(" + number + ")"
    });
    Control.zoom = number;
    return number;
  },
  zoomSlide: function(to) {
    var 
      direction = (to - Control.zoom) > 0 ? 1 : -1,
      turns = 5,
      step = (Math.abs(to - Control.zoom) / turns),
      ival = setInterval(function(){
        Control.zoomTo(Control.zoom + direction * step); 
        if(! turns --) {
          clearInterval(ival);
        }
      }, 1);
  }, 
  panTo: function(where){
    if(where == "last") {
      return Control.panTo(Control.last);
    }
    Control.last = Control.offset;
    $("#main").animate({marginLeft: where});
    Control.offset = where;
  },
  PanLeft: function(){
    Control.panTo(Math.min(0, Control.offset + $(window).width() * 0.75));
  },
  PanRight: function(){
    Control.panTo(Control.offset - $(window).width() * 0.75);
  },
  ZoomIn: function() {
    Control.zoomSlide(Control.zoom + 0.25); 
  },
  ZoomOut: function() {
    Control.zoomSlide(Control.zoom - 0.25); 
  }
}
  
var Panel = {
  map: {},
  id: 0,

  init: function(){
    Panel.template = _.template($("#T-Panel").html());
  },

  Add: function(opts) {
    Panel.id++;
    Panel.map[Panel.id] = {
      DOM: $('<div class="panel well well-small span10" />').html(
        Panel.template( _.extend( { id: Panel.id }, opts ))
      )
    };

    $("#main").append(Panel.map[Panel.id].DOM);
    return Panel.id;
  },

  ToggleCollapse: function(id) {
    var panel = Panel.map[id],
        width,
        dom = $(panel.DOM); 

    if(dom.hasClass('collapsed')) {
      width = panel.width;
      Control.panTo(Panel.offset(id));
    } else {
      panel.width = dom.width();
      width = '2em';
      Control.PanLeft();
    }

    dom.contents().css('visibility', 'hidden');
    dom.animate({width: width}, function(){
      dom.contents().css('visibility', 'visible');
      dom.toggleClass('collapsed');
    });
  },

  offset: function(id) {
    return -(Panel.map[id].DOM.offset().left - $("#main").offset().left);
  },

  ToggleFullscreen: function(id) {
    var panel = Panel.map[id],
        dom = $(panel.DOM); 

    dom.toggleClass('expanded');
    Control.panTo(Panel.offset(id));
  }
};

$(function(){

  Panel.init();
  
  var toLoad = window.location.search.slice(1);
  Panel.Add({
    title: "Famous Authors" ,
    url: "proto.html?" + toLoad
  });
  /*
  Panel.Add({
    title: "mxGraph",
    url: "http://192.168.0.8:8800/home/chris/mxgraph/javascript/examples/wrapping.html"
  });
  Panel.Add({
    title: "Wikipedia: Ear",
    url: "http://en.wikipedia.org/wiki/Ear"
  });
   */ 
    
  $(".panel").each(function(){
    var mthis = this;
    $(".icon-backward", this).click(function(){
      console.log("hi");
      collapseToggle(mthis);
    });
    $(".icon-fullscreen", this).click(function(){
      expandToggle(mthis);
    });
  });
});
