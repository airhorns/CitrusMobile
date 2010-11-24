(function() {
  var TwitterXAuthorizationWindow;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  TwitterXAuthorizationWindow = function() {
    function TwitterXAuthorizationWindow() {
      TwitterXAuthorizationWindow.__super__.constructor.apply(this, arguments);
    }
    __extends(TwitterXAuthorizationWindow, Citrus.XAuthorizationWindow);
    TwitterXAuthorizationWindow.prototype.title = "Add Twitter Account";
    TwitterXAuthorizationWindow.prototype.footerTitle = "Please enter your Twitter account information above.";
    return TwitterXAuthorizationWindow;
  }();
  Citrus.TwitterXAuthorizationWindow = TwitterXAuthorizationWindow;
}).call(this);
