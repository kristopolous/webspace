var evda = EvDa(),
  Step = 0,
  AnchorMap = {},
  ColorList = [
    "rgb(31, 73, 125)"
  ],
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

