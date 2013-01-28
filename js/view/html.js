var v = {};
_.each(NodeType, function(which) {
  v[which] = Backbone.View.extend({
    tagName: 'div',
    className: which,
    template: $("#" + which).html(),
    render: function(){
      var tmpl = _.template(this.template); //tmpl is a function that takes a JSON and returns html

      this.$el.html(tmpl(
        this.model.attributes
      )); //this.el is what we defined in tagName. use $el to get access to jQuery html() function
      return this;
    },
    initialize: function(model) {
      this.model = model;
    }
  });
});

/*
v.DocGlobal = Backbone.view.extend({
  el:$("document"),
  initialize: function() {
  }
});
*/
