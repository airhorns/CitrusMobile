(function() {
  var OAuthorizationController;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  Ti.include("/app/views/accounts/authorization_web_view_window.js");
  OAuthorizationController = function(onload, onerror) {
    d("Creating window");
    this.window = new Citrus.AuthorizationWebViewWindow(this);
    this.window.addEventListener("load", onload);
    this.window.addEventListener("destroy", onerror);
    return this;
  };
  __extends(OAuthorizationController, Citrus.Controller);
  OAuthorizationController.prototype.loadURL = function(url) {
    return this.window.loadURL(url);
  };
  OAuthorizationController.prototype.destroy = function() {
    return this.window.destroyAuthorizeUI();
  };
  Citrus.OAuthorizationController = OAuthorizationController;
}).call(this);
