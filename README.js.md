The Viewer is broken down into 5 stages:

1. File importer
2. Display formater
3. Arranger on screen
4. Lines and arrows
5. Event Hooker

The html file, viewer.html has documentation on its usage. Just load to see how to do it.

All JS files are loaded at start time. An event system called EvDa controls the flow (https://github.com/kristopolous/EvDa). It's used in its most basic form.

CSS files are loaded as needed during the loading of the other files.
