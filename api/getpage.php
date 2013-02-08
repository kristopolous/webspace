<?
require('lib.php');


function removeMeta($xpath) {
  foreach(Array( 
    'magnify',    // Appears after images, not needed because the link is also
                  // encoded within the image itself. 

    'navbox',     // Appears at the bottom of the page 

    'metadata',   // Things like "redirected from" or "see other usages of" (??)

    'dablink',    // ??

    'toc',        // Table of contents that appears at the top of the screen

    'editsection' // The edit buttons
    ) as $class) {

    $nodeList = $xpath->query("//*[contains(@class, '${class}')]");
    foreach($nodeList as $node) {
      _remove($node);
    }
  }
}

function unwrap($xpath) {
  _unwrapShallow($xpath->query("//*[contains(@class, 'mw-headline')]"));
  _unwrapShallow($xpath->query("//span[@dir='auto']")); // h1
}


function makeSemantic($xpath) {

  $nodeList = $xpath->query("//*[@class='thumbcaption']");
  foreach($nodeList as $node) {
    $node = _changeTag($node, 'p'); 
    $node->setAttribute('class', 'media-caption');
  }
  $nodeList = $xpath->query("//*[@class='image']");
  foreach($nodeList as $node) {
    $node->setAttribute('class', 'media-expansion');
  }

  foreach(Array('mediaContainer', 'thumbinner') as $class) {
    $nodeList = $xpath->query("//*[@class='${class}']");
    foreach($nodeList as $node) {
      _unwrapDeep($node);
    }
  }

  $nodeList = $xpath->query("//*[contains(@class, 'thumb')]");
  foreach($nodeList as $node) {
    $node->setAttribute('class', 'media');
  }
}

function setupLinks($xpath) {
  global $base;
  $nodes = $xpath->query('//a');

  foreach($nodes as $anchor) {
    $txt = $anchor->getAttribute('href');
    $link = parse_url($txt);

    if(empty($link['host']) && !empty($link['path'])) {

      // This wikipedia page doesn't exist yet, so we
      // just give it a null term value.
      if (strpos($txt, 'action=edit') > -1) {
        $txt = '';
      } else {
        $txt = 'http://' . $base . $txt;
      }
    }
    _stripAttribs($anchor);
    $anchor->setAttribute('href', $txt);
  }
}

function rootPrepare($article) {
  $wrap = $article->firstChild;
  _stripAttribs($wrap);
  $wrap->setAttribute('id', 'document');
}

function addTitle($article, $title) {
  $article->firstChild->insertBefore(
    $article->importNode(
      _stripAttribs($title), 
      true
    ),
    $article->firstChild->firstChild
  );
}

$url = urldecode($_GET['url']);
$url = parse_url($url);
if(!empty($url['host'])) {
  $base = $url['host'];
} else {
  $base = '';
}

$doc = new DOMDocument();
@$doc->loadHTMLFile($_GET['url']);

$title = $doc->getElementById('firstHeading');

$article = new DOMDocument();
$article->appendChild(
  $article->importNode(
    $doc->getElementById('mw-content-text'),
    true
  )
);

$xpath = new DOMXPath($article);

addTitle($article, $title);
removeMeta($xpath);
unwrap($xpath);
makeSemantic($xpath);
setupLinks($xpath);
rootPrepare($article);

echo $article->saveHTML();
