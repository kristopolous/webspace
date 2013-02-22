<?
/*
 * glick_importer
 *
 * Import pages given a url and convert them into
 * the input format
 */
require('lib.php');

function stripHTMLTags($xpath) {
  $nodeList = $xpath->query("//br");
  foreach($nodeList as $node) {
    _remove($node);
  }
}

function removeHTMLAttribs($xpath) {
  $nodeList = $xpath->query("//a");
  foreach($nodeList as $node) {
    _stripAttribs($node, Array('name', 'href'));
  }
}

function removeAttribs($xpath) {
  $nodeList = $xpath->query("//*");

  // The only two attributes that matter are the id, which
  // is the content of the node, and the transitions, which, if it
  // exists is the label.
  foreach($nodeList as $node) {
    _stripAttribs($node, Array( "id", "transition" ));
  }
}

function swapTags($xpath) {
  $typeMap = Array(
    'Item' => 'p',
    'Node' => 'section'
  );

  foreach($typeMap as $glick => $html) {
    $nodeList = $xpath->query("//${glick}");

    foreach($nodeList as $node) {
      _changeTag($node, $html);
    }
  }
}

function shiftContent($xpath) {
  // Items are our Description nodes
  // We can leave them mostly in tact for now.
  $nodeList = $xpath->query("//Item");
  $doc = $nodeList->item(0)->ownerDocument;

  // The content of the nodes were included in id tags...
  // I don't know why either. Here we remove the id tag
  // and then make it the node value.
  foreach($nodeList as $node) {
    $node->nodeValue = _rmAttr($node, 'id');
  }

  // Get Glicks' "Nodes" and find their document depth
  // Then create H tags based on that depth, maxing out
  // at 6 (note that the File Format spec permits for
  // further explicit depths ... but we ignore that here)
  $nodeList = $xpath->query("//Node");
  foreach($nodeList as $node) {

    $depth = min(6, _depth($node));
    $headline = $doc->createElement("H" . $depth);

    // Glick's XML has a lot of positioning and other decorative
    // properties to it.  These should be derived semantically in
    // our system as opposed to being declared inline without any
    // meaning.
    $headline->nodeValue = _rmAttr($node, 'id');
    $node->insertBefore($headline, $node->firstChild);

    // Glick's transisions are what we call labels, which
    // are enclosed in the title attribute according to
    // the file format.
    if($transition = _rmAttr($node, 'transition')) {
      $headline->setAttribute('title', $transition);
    }
  }
}

function cleanDoc($str) {
  // Glick decided to put <> tags inside quotes, like 
  //
  // <Item value="<a href='blank'>blank</a>">.
  //
  // This is of course invalid so we escape them here:
  return preg_replace_callback('/"([^"]*)"/', function($matches) {
    return '"' . htmlentities($matches[1]) . '"';
  }, $str);
}

function prepareHTML($str) {
  // Now we do things that are easier with regexes.
  // Swap the sections with spans
  $str = preg_replace('/<(\/)?section>/', '<\1span>', $str);

  // This is to drop the header
  $lines = explode("\n", $str);

  // Replace the XML declaration with a div opening tag.
  // The HTML declaration will be added in the next step
  $lines[0] = '<div id="document">';
  $lines[] = "</div>";

  // Bring things back together
  $str = implode("\n", $lines);

  // Resurface the html that we escaped early on 
  // (see cleanDoc)
  $str = html_entity_decode($str);

  // Glicks anchor names are out of spec with our
  // preferred method according the file format.  Additionally,
  // HTML I don't think allows for spaces in the anchor names.
  //
  // So we swap them out for hyphens.
  $str = preg_replace_callback('/=\'([^\']*)\'/', function($matches) {
    return '=\'' . preg_replace('/\s/', '-', $matches[1]) . '\'';
  }, $str);

  return $str;
}

// Glick's name and href attributes are backwards
// so we need to swap them.
function fixAnchors($xpath) {
  $hrefList = $xpath->query("//a[@href]");
  $nameList = $xpath->query("//a[@name]");

  foreach($hrefList as $node) {
    $node->setAttribute('name',
      substr(_rmAttr($node, 'href'), 1)
    );
  }

  foreach($nameList as $node) {
    $node->setAttribute('href',
      '#' . _rmAttr($node, 'name')
    );
  }
}

function promoteCategories($xpath) {
  $nodeList = $xpath->query("//h3|//h2|//h4|//h5|//h6");

  foreach($nodeList as $node) {
    $parent = $node->parentNode;

    _xBeforeY(
      $node,
      $parent
    );

    $parent = _changeTag($parent, "div");
    _addClass($parent, 'description');  
  }
}

function promoteAnchors($xpath) {
  $nodeList = $xpath->query("//a[@name]");
  $doc = $nodeList->item(0)->ownerDocument;

  foreach($nodeList as $node) {
    $text = $node->nodeValue;
    $parent = $node->parentNode;

    // Move the anchor tag up in the hierarchy (out the <p>)
    _xBeforeY(
      $node,
      $parent
    );

    // Take the content of the anchor tag and put it in the old
    // <p> container, thus making the anchor empty (in spec)
    $parent->nodeValue = $text;
    $node->nodeValue = "";

  }

  // Requery as the above operations will confuse PHP DOM
  $nodeList = $xpath->query("//a[@href]");
  foreach($nodeList as $node) {
    $title = $node->parentNode;
    $aside = $title->parentNode;
    _xBeforeY(
      $title,
      $title->parentNode
    );

    $aside = _changeTag($aside, 'div');
    $aside->setAttribute('class', 'aside');

    _changeTag($title, 'p');
  }
}

// First start with glicks xml
$doc = new DOMDocument();
$raw = file_get_contents($_GET['url']);

// Which is invalid xml ... so we make it pass the parser with
// some regexs
$raw = cleanDoc($raw);

$doc->loadXML($raw);
$xpath = new DOMXPath($doc);

// Then we do a number manipulations that are easier to do
// as DOM. This makes it an almost valid HTML file
removeAttribs($xpath);
shiftContent($xpath);
swapTags($xpath);

// Emit the XML then do some manipulations that are
// easier to do as a blob of text.  We get HTML
// at the end.
$rawHTML = prepareHTML($doc->saveXML());
$html = new DOMDocument();

// Load the document AS html.
$html->loadHTML($rawHTML);
$xpath = new DOMXPath($html);

// Drop excess tags (like line breaks)
stripHTMLTags($xpath);

// The HTML2.0 style inline color things
removeHTMLAttribs($xpath);

// Glick screwed up name and href tags. So we need to swap them
fixAnchors($xpath);

// Our format demands that circles are empty nodes. So here is where
// we swap things around and make the asides
promoteAnchors($xpath);

// Glicks format doesn't section things off according to HTML4 flow.
// So we need to swap around the headlines of sections in his containers.
promoteCategories($xpath);

$text = $html->saveHTML();

// Any spans left can now be stripped
$str = preg_replace('/<(\/)?span>/', '', $text);

// Clean up excess whitespace
$str = preg_replace('/[\ ]{2,}/', ' ', $str);

// Tabs to spaces for easy on the eyes
$str = preg_replace('/\t/', ' ', $str);

// And emit it as plain-text for inspection in a browser window
header("Content-type: text/plain");

echo $str;
