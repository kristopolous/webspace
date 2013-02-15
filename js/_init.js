// _init.js
//
// This file initializes the global variables.
// It is intended to run before lib, which initializes
// global function helpers.

var 
  // The IoC wiring system to progress the rendering
  // See https://github.com/kristopolous/EvDa for documentation
  Event = EvDa({
    Stage: 0,
    StageName: ""
  }),

  // The types of shapes we have 
  ShapeType = [ 
    "Category", 
    "Aside", 
    "Description", 
    "Intro", 
    "Path", 
    "Procedure" 
  ],

  AnchorMap = {},

  // A generic repaint callback, Defined in lines and arrows
  Repaint = function(){},

  Start = +(new Date()),

  ColorList = [
    "#647D7A"
  ];

// Make sure that the StageName enum
// matches the stage number ...
//
// See the README.js.md for more
// information on this.
Event.on("Stage", function(what) {
  Event.set("StageName", [
    "file-importer",
    "display-format",
    "arrange-on-screen",
    "lines-and-arrows",
    "hook-events"
  ] [what] );
});

// Make sure that we stop at the appropriate point.
Event.whenSet("StageMax", function(maxStage) {
  Event.test('Stage', function(value, test) {
    test.result(maxStage >= value);
  });
})

Event.on("StageName", function(what) {
  log(what);
});

