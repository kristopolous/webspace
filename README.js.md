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
3. Build Model
4. Arrange on screen
5. Lines and arrows
6. Event Hooker

The html file, viewer.html has documentation on its usage. Just load to see how to do it.

All JS files are loaded at start time. An event system called EvDa controls the flow (https://github.com/kristopolous/EvDa). It's used in its most basic form.

CSS files are loaded as needed during the loading of the other files.


Here's a drawing of how our MV* thing first in:

File Importer -> Display Formatter -> Backbone Model

Then from the Model we do

  [Arranger -> Lines -> Events]



ideas:

Using the dom as the model -- after all, dom is a "document object model".
The problem is of course we need to put a bunch of kludge work around the document semantics to make
it display right. But this doesn't preclude the possibility of storing the semantics in a separate
"document" that doesn't get attached to the web browsers dom.

The reason is that the traversal, membership, inheritance, attribute etc rules seem to have answers
already in the dom.  The dom is of course, a pain in the ass to work with; but supposedly jquery works
nicely over xml with its nifty css3 style selectors.

I think the only fears I have with this:

 1. It's not a model under our control directly and mutating it would be a pain.

 2. It's hard.

 3. It's not well organized and kind of hackish.
  
 4. Type is lost

 5. Slow

 6. Custom events?

Hybrid model:


 Events needed
    Adding/Removing/Rearranging a child, attribute, group name
