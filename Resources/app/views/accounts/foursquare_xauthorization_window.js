(function() {
  var FoursquareXAuthorizationWindow;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  FoursquareXAuthorizationWindow = function() {
    return Citrus.XAuthorizationWindow.apply(this, arguments);
  };
  __extends(FoursquareXAuthorizationWindow, Citrus.XAuthorizationWindow);
  FoursquareXAuthorizationWindow.prototype.title = "Add Foursquare Account";
  FoursquareXAuthorizationWindow.prototype.fieldsToCollect = {
    email: {},
    password: {
      passwordMask: true
    }
  };
  FoursquareXAuthorizationWindow.prototype.footerTitle = "Please enter your Foursquare account information above.";
  Citrus.FoursquareXAuthorizationWindow = FoursquareXAuthorizationWindow;
}).call(this);
