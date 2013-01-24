
var 
  a = new Node(),
  b = new Intro({of: a}),

category(a, new Node());

var c = a.category[0];

intro(c, List(Intro, 3));

var 
  d = c.intro[0],
  e = c.intro[1],
  f = c.intro[2],
  g = new Aside({of: d});

c.category = List(Node, 3);
  
var 
  h = c.category[0],
  k = c.category[1],
  l = c.category[2];

h.content([
  "block one",
  "link 1",
  "block 2"
]);

h.content[0].aside(new Node());

var
  m = h.content[0].aside[0],
  i = h.content[1].describe(new Node());
  n = i.describe[0];
  
l.then(List(Node, 2));

var
  p = l.then[0],
  q = l.then[1];

var _a = new Edge();

_a.from(k, l).to(new Node());

var 
  o = _a.to[1];

o.content([
  "block one",
  "link 1",
  "&",
  "block 2"
]);

var 
  u = o.content[1].describe(List(Node, 3)),
  r = u.describe[0],
  s = u.describe[1],
  t = u.describe[2];

var 
  v = o.find("block 2").add(List(Description, 3)),
  w = v.describe[0],
  x = v.describe[1];

