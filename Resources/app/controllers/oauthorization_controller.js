(function() {
  var OAuthorizationController;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Ti.include("/app/views/accounts/authorization_web_view_window.js");
  OAuthorizationController = function() {
    function OAuthorizationController(onload, onerror) {
      d("Creating window");
      this.window = new Citrus.AuthorizationWebViewWindow(this);
      this.window.addEventListener("load", onload);
      this.window.addEventListener("destroy", onerror);
    }
    __extends(OAuthorizationController, Citrus.Controller);
    OAuthorizationController.prototype.loadURL = function(url) {
      return this.window.loadURL(url);
    };
    OAuthorizationController.prototype.destroy = function() {
      return this.window.destroyAuthorizeUI();
    };
    return OAuthorizationController;
  }();
  Citrus.OAuthorizationController = OAuthorizationController;
}).call(this);
