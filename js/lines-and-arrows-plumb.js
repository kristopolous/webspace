// lines-and-arrows (jsPlumb)
//
//    1. File importer
//    2. Display format
//    3. Arrange on screen
//  * 4. Lines and arrows
//    5. Event Hooker
//
// This file is intended to 
// 
//  * Draw lines and arrows on the screen
//    between the different shapes
//
//  * Associate those lines and arrows with 
//    model/view so that they can change color
//    or get repainted via a call to the model
//
// There may be additional CSS/DOM work beyond
// what was specified in the arranger in order 
// to get the arrows and lines to play nicely.
//
(function(){
  setTimeout(function(){
    Event.when("StageName", 'lines-and-arrows', run);
  }, 400);
    
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

  // This is the Global Repaint defined in the 
  // _init.js file.
  self.Repaint = function() {
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

  function run() {
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
      
    //setup();
    
    var lastContent = $(".shape").get(0), 
        lastConnector = {},
        doBend = false;
          
    $(".Plus").each(function(){
      console.log($(this).offset());
      if($(this).hasClass('Plus')) {
        doBend = true;
      }
      if(!lastContent) {
        lastContent = this;
        return;
      }
      var 
        depth = domDepth(this),
        brush = (depth > 6) ? 
          Edge.h2 : Edge.default;

      this.setAttribute('depth', depth);
          brush.connect({
            source: lastContent,
            target: this,
            endpoints: [ [ "Blank" ], Ends.rec ],
            anchors:[
              [ "TopLeft" ],
              [ "TopLeft" ]
            ],
          });				

          /*
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
              source: lastContent,
             // source: lastConnector[depth],
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
      }
      */
        lastContent = this;
    });
    categoryConnect();
    nextStage();
    return;

  }

})();  
