function clean(scope) {
  $(".thumb, table", scope).remove();
}

function restructure(scope) {
  var 
    intro = _.template($("#Intro").html());
    section = _.template($("#Section").html());

  // Find the intro
  $("h1", scope).each(function(){
    var 
      temp = $("<div />"),
      next,
      walker = this.nextSibling;

    while(walker && walker.nodeName != 'H2') {
      next = walker.nextSibling;
      temp.append(walker);
      walker = next;
    }

    var html = intro({
      content: temp.html()
    });
    temp.replaceWith(html).insertAfter(this);
  });

  // Find all nodes between two h2 nodes
  //
  // Note: Always get the next sibling PRIOR to insertion
  // or else the nextSibling walking will not work.
  _.each(['H2', 'H3', 'H4'], function(tag) {
    $(tag, scope).each(function(){
      var 
        temp = $("<div />").insertBefore(this),
        next,
        walker = this.nextSibling;

      while(walker && walker.nodeName != tag) {
        next = walker.nextSibling;
        temp.append(walker);
        walker = next;
      }

      var html = section({
        title: $(this).remove().html(),
        content: temp.html()
      });
      temp.replaceWith(html);

    });
  });
}
function setup(scope){
  var tmpl = {
    title: _.template($("#Title").html()),
    description: _.template($("#Description").html()),
    category: _.template($("#Category").html())
  },
  tagMap = {
    h2: 'category',
    h1: 'title',
    p: 'description'
  };

  _.each(tagMap, function(template, tag) {
    $(tag, scope).replaceWith(function(){
      return tmpl[template]({
        content: $(this).html()
      });
    });
  });

  $("h1,h2,h3,h4", scope).addClass("shape title");
 
  var widthList, widest;


  widthList = $('h2').map(function(){ return $(this).width() });
  widest = widthList.sort()[widthList.length - 1];
  $('h2').each(function(){
    this.style.width = widest + "px";
  });

  widthList = $('.sectionContainer').map(function(){ return $(this).width() });
  widest = widthList.sort()[widthList.length - 1];
  console.log(widthList);
  $('.sectionContainer').each(function(){
    this.style.width = widest + "px";
  });

  $("a").each(function(){
    var link = this.getAttribute('href');
    this.removeAttribute('href');

    $(this).click(function(){
      Panel.add(link);
    });
  });
}

(function(){
  var toLoad = window.location.search.slice(1);
  $.get('api/getpage.php?url=' + toLoad, function(data){
    var scope;
    $("#document").replaceWith(data);
    scope = $("#document");
    clean(scope);
    restructure(scope);
    setup(scope);
    evda.set('document');
  });
})();
