v.html = {};
v.html.$post = function(){
  $(".Category > .content").click(function(){
    $(this).siblings().filter('div').toggleClass('visible');
    $(this).toggleClass('visible');
  });
}

_.each(NodeType, function(which) {
  v.html[which] = v.$proto[which].extend({
    tagName: 'div',
    className: which,
    template: $("#" + which).html(),
    render: function(container, parent){
      var tmpl = _.template(this.template); 

      this.$el.html(tmpl(
        _.pick( this.model.attributes , ['label', 'content'] )
      )); //this.el is what we defined in tagName. use $el to get access to jQuery html() function
      if(parent) {
        console.log(this.className, this.customRender);
        if(this.customRender) {
          this.customRender(parent, this.$el);
        } else {
          parent.get('render').append(this.$el);
        }
      } else {
        container.append(this.$el);
      }
      var precurse = parent;
      while(precurse) {
        /*
          precurse.get('render').css('width',
            parseInt(precurse.get('render').css('width')) * 2);
            */
        precurse = precurse.parent;
      }
      return this.$el;
    },
    initialize: function(model) {
      this.model = model;
    }
  });

});

v.html.Description.prototype.customRender = function(parent, el) {
  parent.get('render').append(this.$el);
}

v.html.Intro.prototype.customRender = function(parent, el) {
  $("> .label", parent.get('render')).after(el);
}
/*
v.DocGlobal = Backbone.view.extend({
  el:$("document"),
  initialize: function() {
  }
});
*/
