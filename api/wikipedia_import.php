<?
/*
 * wikipedia_import
 *
 * Import pages given a wikipedia url and convert them into
 * the input format
 */
require('lib.php');


function removeMeta($xpath) {
  foreach(Array( 
    'magnify',    // Appears after images, not needed because the link is also
                  // encoded within the image itself. 

    'navbox',     // Appears at the bottom of the page 

    'metadata',   // Things like "redirected from" or "see other usages of" (??)

    'refbegin',   // Bibliograph, footnotes, etc.

    'dablink',    // ??

    'rellink',    // "Main article": 

    'infobox',    // The box of info that often appears on the RHS.
    'toc',        // Table of contents that appears at the top of the screen

    'editsection' // The edit buttons
    ) as $class) {

    $nodeList = $xpath->query("//*[contains(@class, '${class}')]");
    foreach($nodeList as $node) {
      _remove($node);
    }
  }
  
  // These may be useful but we don't have a way of handling
  // them right now (2013.02.11)
  foreach(Array(
    'See_also', 
    'Additional_references',
    'Bibliography',
    'Notes',
    'Cited_in_footnotes',
    'Further_reading',
    'Discography',
    'External_links', 
    'References'
  ) as $id) {

    $nodeList = $xpath->query("//*[@id='${id}']");
    foreach($nodeList as $node) {
      $parent = $node->parentNode;
      while($parent->nextSibling) {
        _remove($parent->nextSibling);
      }
      _remove($parent);
    }
  }
 
}

function unwrap($xpath) {
  _unwrapShallow($xpath->query("//*[contains(@class, 'mw-headline')]"));
  _unwrapShallow($xpath->query("//span[@dir='auto']")); // h1
  _unwrapShallow($xpath->query("//div[@class='Bug6200']")); // blockquote
//  _unwrapDeep($xpath->query("//dd"));
}


function makeSemantic($xpath) {

  $nodeList = $xpath->query("//blockquote");
  foreach($nodeList as $node) {
    $node = _changeTag($node, 'p'); 
    $node->setAttribute('class', 'quote');
  }
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

function paragraphSplitter($xpath) {
  $nodeList = $xpath->query('//p');

  foreach($nodeList as $node) {
    $doc = $node->ownerDocument;
    $container = $doc->createElement('div');
    $container->setAttribute('class', 'description');
    // Remove the references
    $str = preg_replace('/\[\d+\]/', '', trim($node->nodeValue));
    $sentenceList = preg_split('/(?<=[^A-Z])\. /', $str);

    // Get the first sentence for the parent node
    $firstSentence = array_shift($sentenceList);

    foreach($sentenceList as $sentence) {
      $newSentence = trim($sentence);
      if(strlen($newSentence) == 0) {
        continue;
      }
      $newSentence = trim($newSentence, '.') . '.';
      $newParagraph = $container->appendChild($doc->createElement('p'));
      $newParagraph->nodeValue = $newSentence;
    }
    // First put the details before the title
    $node->parentNode->insertBefore($container, $node);

    // then swap the ordering.
    $node->nodeValue = $firstSentence . '.';
    $node->parentNode->insertBefore($node, $container);
  }
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

function getArticle($dom) {
  $article = new DOMDocument();
  $article->appendChild(
    $article->importNode(
      $dom->getElementById('mw-content-text'),
      true
    )
  );
  return $article;
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

$article = getArticle($doc);
$xpath = new DOMXPath($article);

addTitle($article, $title);
removeMeta($xpath);
unwrap($xpath);
makeSemantic($xpath);
setupLinks($xpath);
paragraphSplitter($xpath);
rootPrepare($article);

echo $article->saveHTML();
