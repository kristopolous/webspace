
function restructure_try1(scope) {
  var header = /H(\d)/,
      match,
      // One-based counting, 
      depth = 1,
      current = [],
      root = [];

  $("h1,h2,h3,h4,h5,h6,p", scope).each(function(){
    console.log(this.innerHTML);

    if((match = this.nodeName.match(header)) !== null) {
      // Set the "document depth" to the last H[1-6] tag
      // seen. This comes AFTER processing the current
      // tag
      depth = parseInt(match[1]);
      console.log(match);
    }
  });
}
