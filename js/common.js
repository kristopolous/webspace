var evda = EvDa(),
  Panel = {
    add: function(url){ 
      if(parent != self) {
        parent.Panel.Add({
          title: "unknown",
          url: 'proto.html?' + url
        });
      }
    }
  };

