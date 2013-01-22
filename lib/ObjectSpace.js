(function(){
  var db = DB();
  self.OS = {
    add: function(type, which){
      return db.insert({
        type: type,
        data: which
      });
    },
    get: function(type){
      db.find({type: type}).select('data');
    },
    del: function(){
    }
  };

});
