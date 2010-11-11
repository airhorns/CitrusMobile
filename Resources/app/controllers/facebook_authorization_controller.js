(function() {
  var FacebookAuthorizationController;
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  }, __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  Ti.include("/app/views/accounts/facebook_authorization_window.js");
  FacebookAuthorizationController = function(onLoad, onError) {
    FacebookAuthorizationController.__super__.constructor.apply(this, arguments);
    d(Titanium.Facebook.loggedIn);
    if (Titanium.Facebook.loggedIn) {
      onLoad(Titanium.Facebook.session);
      return null;
    } else {
      d("Not logged in to facebook yet, showing authorization window.");
    }
    this.window = new Citrus.FacebookAuthorizationWindow(this);
    this.window.fbButton.addEventListener("login", __bind(function(e) {
      return e.success ? onLoad(Titanium.Facebook.session) : onError(e);
    }, this));
    this.window.fbButton.addEventListener("cancel", __bind(function(e) {
      return onError(e);
    }, this));
    root.tabGroup.activeTab.open(this.window.win, {
      animated: true
    });
    return this;
  };
  __extends(FacebookAuthorizationController, Citrus.Controller);
  FacebookAuthorizationController.prototype.destroy = function() {
    return this.window.destroyAuthorizeUI();
  };
  Citrus.FacebookAuthorizationController = FacebookAuthorizationController;
}).call(this);
