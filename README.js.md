# File Layout

There is

  api/ - Converters
  css/ - CSS with the stages (see below)
  docs/ - Manually authored documents
  import/ - David Glick documentes
  js/ - Javascript files
    min/ - Minified versions of the dependencies
    raw/ - "Debug" versions of the dependencies
  viewer.html - the MVP viewer (see files for documentation)
  panel.html - The panel system for the views.

The Viewer is broken down into 5 stages:

1. File importer
2. Display format
3. Arrange on screen
4. Lines and arrows
5. Event Hooker

The html file, viewer.html has documentation on its usage. Just load to see how to do it.

All JS files are loaded at start time. An event system called EvDa controls the flow (https://github.com/kristopolous/EvDa). It's used in its most basic form.

CSS files are loaded as needed during the loading of the other files.


Here's a drawing of how our MV* thing first in:

File Importer -> Display Formatter -> Backbone Model

Then from the Model we do

  [Arranger -> Lines -> Events]

