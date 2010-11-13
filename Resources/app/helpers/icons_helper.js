(function() {
  _.extend(Citrus, {
    getIconPath: function(name) {
      var path;
      name = (name || "Generic").toLowerCase().replace("account", "").replace("action", "");
      path = "images/account_icons/" + name + ".png";
      d(path);
      return path;
    }
  });
}).call(this);
