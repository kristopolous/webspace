<?

function _stripAttribs($node) {
  $list = Array();
  foreach($node->attributes as $attr) {
    $list[] = $attr->name;
  }
  foreach($list as $attr) {
    $node->removeAttribute($attr);
  }
  return $node;
}

function _remove($node) {
  $parent = $node->parentNode;
  $parent->removeChild($node);
  return $parent;
}

function _changeTag($node, $name) {
  $document = $node->ownerDocument; 
  $newnode = $document->createElement($name);
  foreach($node->childNodes as $child) {
    $newnode->appendChild( $child->cloneNode(true) );
  }
  //$newnode->nodeValue = $node->nodeValue;
  $node->parentNode->replaceChild($newnode, $node);
  return $newnode;
}

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

function unwrapReal($nodeList) {
  foreach($nodeList as $node) {
    $text = $node->nodeValue;
    $parent = $node->parentNode;
    $parent->removeChild($node);
    $parent->nodeValue = $text; 
  }
}
function unwrap($xpath) {
  unwrapReal($xpath->query("//*[contains(@class, 'mw-headline')]"));
  unwrapReal($xpath->query("//span[@dir='auto']")); // h1
}

function makeSemantic($xpath) {
  $map = Array(
    'thumbcaption' => 'figcaption',
    'thumbinner' => 'figure'
  );

  foreach($map as $class => $tag) {
    $nodeList = $xpath->query("//*[@class='${class}']");
    foreach($nodeList as $node) {
      $node = _changeTag($node, $tag); 
      $node->removeAttribute('class');
    }
  }
}

function setupLinks($xpath) {
  global $base;
  $nodes = $xpath->query('//a/@href');
  foreach($nodes as $href) {
    $link = parse_url($href->nodeValue);
    $txt = $href->nodeValue;
    if(empty($link['host']) && !empty($link['path'])) {
      $href->nodeValue = 'http://' . $base . $txt;
    }
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
$doc->loadHTMLFile($_GET['url']);

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
