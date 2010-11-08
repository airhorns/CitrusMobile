(function() {
  var VisitLinkAction;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  VisitLinkAction = function() {
    return Citrus.PlatformAction.apply(this, arguments);
  };
  __extends(VisitLinkAction, Citrus.PlatformAction);
  VisitLinkAction.declares = ["url"];
  VisitLinkAction.prototype.type = "PlatformVisitLinkAction";
  VisitLinkAction.prototype.buttonText = "Safari";
  VisitLinkAction.prototype.action = function(success, failure) {
    return Titanium.Platform.openURL(this.url);
  };
  Citrus.Actions.Platform.VisitLinkAction = VisitLinkAction;
}).call(this);
