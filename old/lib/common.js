// transitionally connect a number of nodes in an ordered manner
function Procedure() {
  var args = slice(arguments);
  if(args.length > 1) {
    args[0].then(args[1]);
    return Procedure.call(args.slice(1));
  }
}

function List(type, count) {
  var ret = [];
  while(count-- > 0) {
    ret.push(new type());
  }
  return ret;
}
