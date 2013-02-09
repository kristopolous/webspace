var visible = true,
    evda = EvDa();

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
  var node = $(this).parent().parent().next();
  if(this.hide) {
    this.innerHTML = '&#xe009;';
    $(node).show().animate({
      opacity: 1,
      fontSize: "16px"
    }, {
      duration: 600,
      step:repaint
    });
  } else {
    this.innerHTML = '&#xe008;';
    $(node).animate({
      opacity: 0,
      fontSize: "0px"
    }, {
      duration: 600,
      step:repaint
    }, function(){
      $(this).hide();
    });
  }
  this.hide = !this.hide;
}


function bend(el) {
  return (50 / $(el).width());
}

var Over = {
  vertical: function(brush, arrow) {
    brush.connect({
      endpoints: [ Ends.rec1, [ "Blank" ] ],
      source: arrow, target: arrow,
      anchors:[ [ "TopCenter" ], [ "BottomCenter" ] ]
    });				
  }
};

function setup(scope){
  var tmpl = {
    title: _.template($("#Title").html()),
    description: _.template($("#Description").html()),
    category: _.template($("#Category").html())
  },
  tagMap = {
    h2: 'category',
    h1: 'title',
    p: 'description'
  };

  _.each(tagMap, function(template, tag) {
    $(tag, scope).replaceWith(function(){
      return tmpl[template]({
        content: $(this).html()
      });
    });
  });

  $("h1,h2,h3,h4", scope).addClass("shape title");
 
  var widthList, widest;


  widthList = $('h2').map(function(){ return $(this).width() });
  widest = widthList.sort()[widthList.length - 1];
  $('h2').each(function(){
    this.style.width = widest + "px";
  });

  widthList = $('.sectionContainer').map(function(){ return $(this).width() });
  widest = widthList.sort()[widthList.length - 1];
  console.log(widthList);
  $('.sectionContainer').each(function(){
    this.style.width = widest + "px";
  });

  $("a").each(function(){
    var link = this.getAttribute('href');
    this.removeAttribute('href');

    $(this).click(function(){
      Panel.add(link);
    });
  });
}

var Ends = {};
var Edge = {};
function categoryConnect(){
  $(".category.lineHelper").each(function(){
    var h1 = this;
   
    Over.vertical(Edge.h1, this);

    $(h1.parentNode)
      .siblings()
      .find(".h2.lineHelper")
      .each( function(){
        Edge.h1.connect({
          source: h1,
          target: this,
          anchors:[ [ "BottomCenter" ], [ "TopCenter" ] ]
        });
        Over.vertical(Edge.h1, this);
        Edge.arrow.connect({
          source: $(this),
          target: $(this).next().next(),
          anchors:[ [ "TopCenter" ], [ "BottomCenter" ] ],
          overlays: [
            ["Arrow", { foldback: 0.80, location: 1, width: 20, length:15}]
          ]
        });				
       });
  });
}

function repaint(){
  for(section in Edge) {
    Edge[section].selectEndpoints().repaint();
    Edge[section].select().repaint();
  }
}

function scaffold() {
  var width = 4;
  setup();

  $(window).resize(repaint);
  $(".h2Plus").click(toggle);
  $(".h1Plus").click(toggle);
  Ends =  {
    rec: [ "Rectangle", {width: width , height: width} ],
    rec1: [ "Rectangle", {width: width + 4, height: 8} ]
  };

  jsPlumb.importDefaults({
    Connector:"Straight",
    PaintStyle:{ lineWidth:width, strokeStyle:"rgb(31, 73, 125)" },
    Endpoint:[ "Blank" ],
    EndpointStyle:{ fillStyle: "rgb(31, 73, 125)" }
  });
  Edge.default = jsPlumb.getInstance({
    Connector:"Straight",
    PaintStyle:{ lineWidth:width, strokeStyle:"rgb(31, 73, 125)" },
    Endpoint:[ "Blank" ],
    EndpointStyle:{ fillStyle: "rgb(31, 73, 125)" }
  });

  Edge.arrow = jsPlumb.getInstance({
    Connector:"Straight",
    PaintStyle:{ lineWidth:0, strokeStyle:"rgb(31, 73, 125)" },
    Endpoint:[ "Blank" ]
  })

  var layout = [];
    
  Edge.h1 = jsPlumb.getInstance({
    Connector:"Straight",
    PaintStyle:{ lineWidth:width * 2, strokeStyle:"rgb(31, 73, 125)" },
    Endpoint:[ "Blank" ],
    EndpointStyle:{ fillStyle: "rgb(31, 73, 125)" }
  });

  Edge.h2 = jsPlumb.getInstance({
    Connector:"Straight",
    PaintStyle:{ lineWidth:width * 0.65, strokeStyle:"rgb(31, 73, 125)" },
    Endpoint:[ "Blank" ],
    EndpointStyle:{ fillStyle: "rgb(31, 73, 125)" }
  });

    
  $(".shape, .arrowHelper").each(function(){
    layout.push([this, $(this).offset()]);
  });
  
/*
  $.each(layout, function(ix, which) {
    $(which[0])
      .css('position','absolute')
      .css(which[1]);
  });

*/
  var PARENT = $(document.body)[0];
  function Depth(descendant) {
    var depth = 0;
    var el = $(descendant);
    while (el[0] != PARENT) {
      depth++;
      el = el.parent();
    }
    return depth;
  }	

  var lastContent = $(".shape").get(0), 
      lastConnector = {},
      doBend = false;

  $("#document").draggable();

  $("p").click(function(){
    var intro = _.template($("#Speech").html());
    var html = intro({phrase: $(this).text()});
    $("#sound").html(html);
  });
        
  $(".shape, .layer").each(function(){
    if($(this).hasClass('layer')) {
      doBend = true;
      return;
    }
    var depth = Depth(this),
     brush = (depth > 6) ? 
        Edge.h2 : Edge.default;

    this.setAttribute('depth', depth);
    if($(this).hasClass("connector")) {
      if(doBend) {
        doBend = false;
        brush.connect({
          source: lastContent,
          target: this,
          endpoints: [ [ "Blank" ], Ends.rec ],
          anchors:[
            [ bend(lastContent), 0.9, 1, 0.5 ],
            [ "TopLeft" ]
          ],
        });				
      } else {
        brush.connect({
          source: lastConnector[depth],
          target: this,
          endpoints: [ [ "Blank" ], Ends.rec ],
          anchors:[ [ "BottomLeft" ], [ "TopLeft" ] ],
        });	
      } 

      lastConnector[depth] = this;
    } else if($(this).hasClass('description')) {
      brush.connect({
        source: lastConnector[depth],
        target: lastConnector[depth],
        anchors:[ [ "LeftMiddle" ], [ "RightMiddle" ] ]
      });				
      Edge.arrow.connect({
        source: lastConnector[depth],
        target: $(lastConnector[depth]).next(),
        anchors:[ [ "RightMiddle" ], [ "RightMiddle" ] ],
        overlays: [
          ["Arrow", { foldback: 0.75, location: 1, width: 13, length:8}]
        ]
      });				
      lastContent = this; 
    } else {
      lastContent = this;
    }
  });
  categoryConnect();
}
	
window.jsPlumbDemo = {
    
  init : function() {
    evda.isset('do-lines-and-arrows', scaffold);
  }    
}
  
