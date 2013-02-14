v.base = {};
v.base.$post = function(){
}

_.each(ShapeType, function(which) {
  v.base[which] = v.$proto[which].extend({
    tagName: 'div',
    render: function(container, parent){
      var template = getTemplate(ev('StageName'), which);

      this.$el.base(template(
        _.pick( this.model.attributes , ['label', 'content'] )
      )); //this.el is what we defined in tagName. use $el to get access to jQuery base() function

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

v.base.Description.prototype.customRender = function(parent, el) {
  parent.get('render').append(this.$el);
}

v.base.Intro.prototype.customRender = function(parent, el) {
  $("> .label", parent.get('render')).after(el);
}
/*
v.DocGlobal = Backbone.view.extend({
  el:$("document"),
  initialize: function() {
  }
});
*/
