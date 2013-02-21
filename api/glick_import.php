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

  foreach($nodeList as $node) {
    _stripAttribs($node, Array( "id", "transition" ));
  }
}

function swapTags($xpath) {
  $nodeList = $xpath->query("//Item");

  foreach($nodeList as $node) {
    _changeTag($node, 'p');
  }

  $nodeList = $xpath->query("//Node");
  foreach($nodeList as $node) {
    _changeTag($node, 'section');
  }
}

function shiftContent($xpath) {
  $nodeList = $xpath->query("//Item");
  $doc = $nodeList->item(0)->ownerDocument;

  foreach($nodeList as $node) {
    $node->nodeValue = _rmAttr($node, 'id');
  }

  $nodeList = $xpath->query("//Node");
  foreach($nodeList as $node) {
    $depth = min(6, _depth($node));
    $headline = $doc->createElement("H" . $depth);
    $headline->nodeValue = _rmAttr($node, 'id');
    $node->insertBefore($headline, $node->firstChild);

    if($transition = _rmAttr($node, 'transition')) {
      $headline->setAttribute('title', $transition);
    }
  }
}

function cleanDoc($str) {
  return preg_replace_callback('/"([^"]*)"/', function($matches) {
    return '"' . htmlentities($matches[1]) . '"';
  }, $str);
}

function prepareHTML($str) {
  // Now we do things that are easier with regexes.
  // Swap the sections with divs
  $str = preg_replace('/<(\/)?section>/', '<\1span>', $str);

  // dump the newly created \n
  $lines = explode("\n", $str);

  // wrap 
  $lines[0] = '<div id="document">';
  $lines[] = "</div>";

  $str = implode("\n", $lines);

  // resurface the html
  $str = html_entity_decode($str);

  // Glicks anchor names are out of spec
  $str = preg_replace_callback('/=\'([^\']*)\'/', function($matches) {
    return '=\'' . preg_replace('/\s/', '-', $matches[1]) . '\'';
  }, $str);

  return $str;
}

// Glick's name and href are backwards
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

  // Requery
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

$doc = new DOMDocument();
$raw = file_get_contents($_GET['url']);
$raw = cleanDoc($raw);

$doc->loadXML($raw);
$xpath = new DOMXPath($doc);

removeAttribs($xpath);
shiftContent($xpath);
swapTags($xpath);

$rawHTML = prepareHTML($doc->saveXML());
$html = new DOMDocument();
$html->loadHTML($rawHTML);
$xpath = new DOMXPath($html);

stripHTMLTags($xpath);
removeHTMLAttribs($xpath);
fixAnchors($xpath);
promoteAnchors($xpath);
promoteCategories($xpath);

$text = $html->saveHTML();

// any spans left can now be stripped
$str = preg_replace('/<(\/)?span>/', '', $text);

// Clean up excess whitespace
$str = preg_replace('/[\ ]{2,}/', ' ', $str);

// tabs to spaces for easy on the eyes
$str = preg_replace('/\t/', ' ', $str);

header("Content-type: text/plain");
echo $str;
