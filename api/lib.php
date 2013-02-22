<?
// lib.php
//
// DOM level helpers to modify HTML

// Remove all the attributes of a node
// Except those that may be specified in the second argument, $leave
function _stripAttribs($node, $leave = Array()) {
  $list = Array();

  foreach($node->attributes as $attr) {
    $list[] = $attr->name;
  }

  foreach($list as $attr) {
    if (!in_array($attr, $leave)) {
      $node->removeAttribute($attr);
    }
  }
  return $node;
}

// Copy all the attributes in the node $from to
// the node $to
function _copyAttribs($from, $to) {
  foreach($from->attributes as $attr) {
    $to->setAttribute($attr->name, $attr->value);
  }
}

// Remove a node, returning the parent
function _remove($node) {
  $parent = $node->parentNode;
  $parent->removeChild($node);
  return $parent;
}

// Insert node X before node Y, based on Y.
function _xBeforeY($x, $y) {
  $y->parentNode->insertBefore($x, $y);
}

// Remove a node, returning the child
function _detach($node) {
  return $node->parentNode->removeChild($node);
}

// Move the contents of a dom node from one to another, deeply.
function _moveDeep($from, $to) {
  while($from->hasChildNodes()) {
    $to->appendChild(
      $from->removeChild($from->firstChild)
    );
  }
}

// Get the DOM depth of a node
function _depth($node) {
  $depth = 0;
  while($node->parentNode) {
    $node = $node->parentNode;
    $depth ++;
  }
  return $depth;
}

// Add a CSS class to a node ... minding the spacing rules
function _addClass($node, $cls) {
  $existing = $node->hasAttribute('class') ? 
    $node->getAttribute('class') : "";

  $node->setAttribute('class', trim($existing . ' ' . $cls));
}

// Change the tag type of a node
function _changeTag($node, $name) {
  $document = $node->ownerDocument; 
  $newnode = $document->createElement($name);
  _copyAttribs($node, $newnode);
  _moveDeep($node, $newnode);
  $node->parentNode->replaceChild($newnode, $node);
  return $newnode;
}

// Do a shallow unwrapping of a tag: i.e, just the nodeValue
function _unwrapShallow($nodeList) {
  foreach($nodeList as $node) {
    $text = $node->nodeValue;
    $parent = $node->parentNode;
    _remove($node);
    $parent->nodeValue = $text; 
  }
}

// Do a deep-unwrapping of a tag: i.e., all the children; as in cloneNode(true)
function _unwrapDeep($node) {
  _moveDeep($node, $node->parentNode);
  return _remove($node);
}

// Remove and return an attribute iff it exists.
function _rmAttr($node, $attr) {
  if($node->hasAttribute($attr)) {
    $value = $node->getAttribute($attr);
    $node->removeAttribute($attr);
    return $value;
  } else {
    return false;
  }
}

