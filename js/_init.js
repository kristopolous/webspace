// _init.js
//
// This file initializes the global variables.
// It is intended to run before lib, which initializes
// global function helpers.

var 
  // The IoC wiring system to progress the rendering
  // See https://github.com/kristopolous/EvDa for documentation
  evda = EvDa({
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

  ColorList = [
    "#647D7A"
  ];

// Make sure that the StageName enum
// matches the stage number ...
//
// See the README.js.md for more
// information on this.
evda("Stage", function(what) {
  evda("StageName", [
    "file-importer",
    "display-format",
    "arrange-on-screen",
    "lines-and-arrows",
    "hook-events"
  ] [what] );
});

evda("StageName", function(what) {
  console.log(what);
});

