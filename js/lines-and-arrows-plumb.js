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

  Repaint = function() {
    for(section in Edge) {
      Edge[section].selectEndpoints().repaint();
      Edge[section].select().repaint();
    }
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

  function setup(){
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
      $(tag).replaceWith(function(){
        return tmpl[template]({
          content: $(this).html()
        });
      });
    });

    $(".category-group").addClass("shape title");
  }

  function categoryConnect(){
    $(".category.line-helper").each(function(){
      var h1 = this;
     
      Over.vertical(Edge.h1, this);

      $(h1.parentNode)
        .siblings()
        .find(".h2.line-helper")
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

  function scaffold() {
    addCss('lines-and-arrows')
    setup();
    
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
          
    $(".shape, .layer").each(function(){
      if($(this).hasClass('layer')) {
        doBend = true;
        return;
      }
      var 
        depth = Depth(this),
        brush = (depth > 6) ? 
          Edge.h2 : Edge.default;

      this.setAttribute('depth', depth);

      if($(this).hasClass("connector")) {
        console.log(lastContent, this);
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
          if(lastConnector[depth]) {
            brush.connect({
              source: lastConnector[depth],
              target: this,
              endpoints: [ [ "Blank" ], Ends.rec ],
              anchors:[ [ "BottomLeft" ], [ "TopLeft" ] ],
            });	
          }
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
    return;
    categoryConnect();

    if(Step > 3) {
      evda.set('hook-events');
    }
  }

  // Only after the importer, parser and arranger are done do we get
  // to do our line and arrows.
  setTimeout(function(){
    evda.isset('lines-and-arrows', scaffold);
  }, 400);
    
})();  
