
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


  var books = [
    {title:"JS the good parts", author:"John Doe", releaseDate:"2012", keywords:"JavaScript Programming"},
    {title:"CS the better parts", author:"John Doe", releaseDate:"2012", keywords:"CoffeeScript Programming"},
    {title:"Scala for the impatient", author:"John Doe", releaseDate:"2012", keywords:"Scala Programming"},
    {title:"American Psyco", author:"John Doe", releaseDate:"2012", keywords:"Novel Slasher"},
    {title:"Eloquent JavaScript", author:"John Doe", releaseDate:"2012", keywords:"JavaScript Programming"}
  ];

  var Book = Backbone.Model.extend({
    defaults:{
      coverImage:"img/placeholder.png",
      title:"No title",
      author:"Unknown",
      releaseDate:"Unknown",
      keywords:"None"
    }
  });

  var Library = Backbone.Collection.extend({
    model:Book
  });

  var BookView = Backbone.View.extend({
    tagName:"div",
    className:"bookContainer",
    template:$("#bookTemplate").html(),

    render:function () {
      var tmpl = _.template(this.template); //tmpl is a function that takes a JSON and returns html

      this.$el.html(tmpl(this.model.toJSON())); //this.el is what we defined in tagName. use $el to get access to jQuery html() function
      return this;
    },

    events: {
      "click .delete": "deleteBook"
    },

    deleteBook:function () {
      //Delete model
      this.model.destroy();

      //Delete view
      this.remove();
    }
  });

  var LibraryView = Backbone.View.extend({
    el:$("#books"),

    initialize:function () {
      this.collection = new Library(books);
      this.render();

      this.collection.on("add", this.renderBook, this);
      this.collection.on("remove", this.removeBook, this);
    },

    render:function () {
      var that = this;
      _.each(this.collection.models, function (item) {
        that.renderBook(item);
      });
    },

    events:{
      "click #add":"addBook"
    },

    addBook:function (e) {
      e.preventDefault();

      var formData = {};

      $("#addBook div").children("input").each(function (i, el) {
        if ($(el).val() !== "") {
          formData[el.id] = $(el).val();
        }
      });

      books.push(formData);

      this.collection.add(new Book(formData));
    },

    removeBook: function(removedBook){
      var removedBookData = removedBook.attributes;

      _.each(removedBookData, function(val, key){
        if(removedBookData[key] === removedBook.defaults[key]){
          delete removedBookData[key];
        }
      });

      _.each(books, function(book){
        if(_.isEqual(book, removedBookData)){
          books.splice(_.indexOf(books, book), 1);
        }
      });
    },

    renderBook:function (item) {
      var bookView = new BookView({
        model:item
      });
      this.$el.append(bookView.render().el);
    }
  });

  var libraryView = new LibraryView();

  /*
   var book = new Book({
   title:"Some title",
   author:"John Doe",
   releaseDate:"2012",
   keywords:"JavaScript Programming"
   });

   bookView = new BookView({
   model: book
   });

   $("#books").html(bookView.render().el);
   */
