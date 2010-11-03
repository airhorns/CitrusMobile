(function() {
  var CodesWindow;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  CodesWindow = function() {
    return Citrus.PlaceholderWindow.apply(this, arguments);
  };
  __extends(CodesWindow, Citrus.PlaceholderWindow);
  Citrus.CodesWindow = CodesWindow;
}).call(this);
