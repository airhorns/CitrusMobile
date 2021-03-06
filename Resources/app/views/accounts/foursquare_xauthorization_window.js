(function() {
  var FoursquareXAuthorizationWindow;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  FoursquareXAuthorizationWindow = function() {
    function FoursquareXAuthorizationWindow() {
      FoursquareXAuthorizationWindow.__super__.constructor.apply(this, arguments);
    }
    __extends(FoursquareXAuthorizationWindow, Citrus.XAuthorizationWindow);
    FoursquareXAuthorizationWindow.prototype.title = "Add Foursquare Account";
    FoursquareXAuthorizationWindow.prototype.fieldsToCollect = {
      email: {},
      password: {
        passwordMask: true
      }
    };
    FoursquareXAuthorizationWindow.prototype.footerTitle = "Please enter your Foursquare account information above.";
    return FoursquareXAuthorizationWindow;
  }();
  Citrus.FoursquareXAuthorizationWindow = FoursquareXAuthorizationWindow;
}).call(this);
