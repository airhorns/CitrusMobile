(function() {
  var TwitterXAuthorizationWindow;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  TwitterXAuthorizationWindow = function() {
    return Citrus.XAuthorizationWindow.apply(this, arguments);
  };
  __extends(TwitterXAuthorizationWindow, Citrus.XAuthorizationWindow);
  TwitterXAuthorizationWindow.prototype.title = "Add Twitter Account";
  TwitterXAuthorizationWindow.prototype.footerTitle = "Please enter your Twitter account information above.";
  Citrus.TwitterXAuthorizationWindow = TwitterXAuthorizationWindow;
}).call(this);
