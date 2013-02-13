(function(){

  var 
    width = 4,
    Ends = {},
    Edge = {},
    Over = {
      vertical: function(brush, arrow) {
        brush.connect({
          endpoints: [ Ends.rec1, [ "Blank" ] ],
          source: arrow, target: arrow,
          anchors:[ [ "TopCenter" ], [ "BottomCenter" ] ]
        });				
      }
    };

  function Depth(descendant) {
    var 
      depth = 0,
      el = $(descendant);

    while (el[0] != document.body) {
      depth++;
      el = el.parent();
    }
    return depth;
  }	

  function toggle(){
    var node = $(this).parent().parent().parent().next();
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
      }, 
      {
        duration: 600,
        step:repaint
      }, function(){
        node.css('display', 'none');
      });
    }
    this.hide = !this.hide;
  }

  function bend(el) {
    return (50 / $(el).width());
  }

  function makeBrush(width, color){
    return jsPlumb.getInstance({
      Connector: "Straight",
      PaintStyle: { lineWidth: width, strokeStyle: color },
      Endpoint: [ "Blank" ],
      EndpointStyle: { fillStyle: color }
    });
  }

  function setup(scope){
    var tmpl = {
      title: _.template($("#T-LA-Title").html()),
      description: _.template($("#T-LA-Description").html()),
      category: _.template($("#T-LA-Category").html())
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

    $(".category-group", scope).addClass("shape title");
   
    $("a[href^=#]").each(function(){
      var link = this.getAttribute('href');
      this.removeAttribute('href');

      $(this).click(function(){
        Panel.add(link);
      });
    });
  }

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
    addCss('lines-and-arrows')
    //setup("#document");

    $(window).resize(repaint);
    $(".Plus").click(toggle);
    
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
   

    Ends =  {
      rec: [ "Rectangle", {width: width , height: width} ],
      rec1: [ "Rectangle", {width: width + 4, height: 8} ]
    };

    jsPlumb.importDefaults({
      Connector: "Straight",
      PaintStyle: { lineWidth: width, strokeStyle: ColorList[0] },
      Endpoint: [ "Blank" ],
      EndpointStyle: { fillStyle: ColorList[0] }
    });
      
    Edge = {
      arrow: makeBrush(0, ColorList[0]),
      h1: makeBrush(width * 2, ColorList[0]),
      h2: makeBrush(width * 0.65, ColorList[0]),
      default: makeBrush(width, ColorList[0])
    };
      
    var lastContent = $(".shape").get(0), 
        lastConnector = {},
        doBend = false;

    $("#document").draggable();
          
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

  evda.isset('lines-and-arrows', scaffold);
    
  // Only after the importer, parser and arranger are done do we get
  // to do our line and arrows.
  window.jsPlumbDemo = {
    init : function() { }    
  }
})();  
