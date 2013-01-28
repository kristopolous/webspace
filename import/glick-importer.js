#!/usr/local/bin/node
var xml2js = require('xml2js'),
    cheerio = require('cheerio'),
    fs = require('fs'),
    output = [],
    UID = 0,
    CIDMap = {},
    CID = 0,
    stack = [];

var parser = new xml2js.Parser();

function Link(dest) {
  if(!CIDMap[dest]) {
    CIDMap[dest] = CID++;
  }
  return CIDMap[dest];
}

function parse(txt) {
  var mtxt = txt,
      content = [];
  [
    [/.dummy/, ''],
    [/(^.*)<a/g, '<span>$1</span><a'],
    [/a>(.*)$/, 'a><span>$1</span>'],
    [/^([^<].*)$/, '<span>$1</span>']
  ].forEach(function(what) {
    mtxt = mtxt.replace(what[0], what[1]);
  });

  var $ = cheerio.load(mtxt);
  $("*").each(function(i, el) {
    var txt = $(this).text();
    if(txt.length) {
      if (el.name == 'a') {
        if(el.attribs.href) {
          var id = Link(el.attribs.href.slice(1));
          content.push({
            type: 'link', 
            cid: id, 
            data: txt
          });
        } else {
          var id = Link(el.attribs.name);
          content.push({
            type: 'dest', 
            cid: id, 
            data: txt
          });
        }
      } else {
        content.push({
          type: 'text',
          data: txt
        });
      }
    }
  });
  return content;
}

function map(xml, test, obj) {
  for(var key in test) {
    if(xml[key]) {
      obj[test[key]] = xml[key];
    }
  }
}

function recurse(what, type) {

  stack.push(UID++);

  if(what.$) {
    var payload = {
      parent: stack.slice(-2)[0],
      uid: stack.slice(-1)[0],
      type: type,
      content: parse(what.$.id.replace(/\s+/g, ' '))
    };
    map(what.$, {
      imagename: 'image',
      transition: 'label'
    }, payload);
    output.push(payload);
  }
  [
    ['Node', 'Category'],
    ['Item', 'Description']
  ].forEach(function(tuple) {
    if(what[tuple[0]]) {
      what[tuple[0]].forEach(function(item) {
        recurse(item, tuple[1]);
      });
    }
  });

  stack.pop();
}

if(process.argv.length > 2) {
  fs.readFile(process.argv[2], 'utf-8', function(err, data) {
    parser.parseString(data, function(err, res) {
      recurse(res.Node, 'Category');
    });
    console.log(JSON.stringify(output));
  });
} else {
  console.log("I need an xml file to convert");
}
