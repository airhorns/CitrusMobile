(function() {
  var FacebookAuthorizationController;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Ti.include("/app/views/accounts/facebook_authorization_window.js");
  FacebookAuthorizationController = function() {
    function FacebookAuthorizationController(onLoad, onError) {
      FacebookAuthorizationController.__super__.constructor.apply(this, arguments);
      d(Titanium.Facebook.isLoggedIn());
      if (Titanium.Facebook.isLoggedIn()) {
        onLoad(Titanium.Facebook.session);
        return;
      } else {
        d("Not logged in to facebook yet, showing authorization window.");
      }
      this.window = new Citrus.FacebookAuthorizationWindow(this);
      this.window.fbButton.addEventListener("login", __bind(function(e) {
        if (e.success) {
          return onLoad(Titanium.Facebook.session);
        } else {
          return onError(e);
        }
      }, this));
      this.window.fbButton.addEventListener("cancel", __bind(function(e) {
        return onError(e);
      }, this));
      root.tabGroup.activeTab.open(this.window.win, {
        animated: true
      });
    }
    __extends(FacebookAuthorizationController, Citrus.Controller);
    FacebookAuthorizationController.prototype.destroy = function() {
      return this.window.destroyAuthorizeUI();
    };
    return FacebookAuthorizationController;
  }();
  Citrus.FacebookAuthorizationController = FacebookAuthorizationController;
}).call(this);
