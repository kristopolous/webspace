<?
// Remove all the attributes of a node
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

// Remove a node, returning the parent
function _remove($node) {
  $parent = $node->parentNode;
  $parent->removeChild($node);
  return $parent;
}

// Move the contents of a dom node from one to another, deeply.
function _moveDeep($from, $to) {
  while($from->hasChildNodes()) {
    $to->appendChild(
      $from->removeChild($from->firstChild)
    );
  }
}

// Change the tag type of a node
function _changeTag($node, $name) {
  $document = $node->ownerDocument; 
  $newnode = $document->createElement($name);
  _moveDeep($node, $newnode);
  $node->parentNode->replaceChild($newnode, $node);
  return $newnode;
}

// Do a shallow unwrapping of a tag
function _unwrapShallow($nodeList) {
  foreach($nodeList as $node) {
    $text = $node->nodeValue;
    $parent = $node->parentNode;
    _remove($node);
    $parent->nodeValue = $text; 
  }
}

// Do a deep-unwrapping of a tag
function _unwrapDeep($node) {
  _moveDeep($node, $node->parentNode);
  _remove($node);
}
