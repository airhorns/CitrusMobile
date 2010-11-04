(function() {
  var XAuthorizationController;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  Ti.include("/app/views/accounts/xauthorization_window.js");
  XAuthorizationController = function(onload, onerror) {
    this.window = new Citrus.XAuthorizationWindow();
    return this;
  };
  __extends(XAuthorizationController, Citrus.Controller);
  XAuthorizationController.prototype.loadURL = function(url) {
    return this.window.loadURL(url);
  };
  XAuthorizationController.prototype.destroy = function() {
    return this.window.destroyAuthorizeUI();
  };
  Citrus.XAuthorizationController = XAuthorizationController;
}).call(this);
