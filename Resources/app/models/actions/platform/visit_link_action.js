(function() {
  var VisitLinkAction;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  VisitLinkAction = function() {
    function VisitLinkAction() {
      VisitLinkAction.__super__.constructor.apply(this, arguments);
    }
    __extends(VisitLinkAction, Citrus.PlatformAction);
    VisitLinkAction.declares = ["url"];
    VisitLinkAction.prototype.type = "PlatformVisitLinkAction";
    VisitLinkAction.prototype.buttonText = "Safari";
    VisitLinkAction.prototype.iconName = "go";
    VisitLinkAction.prototype.action = function(success, failure) {
      return Titanium.Platform.openURL(this.url);
    };
    return VisitLinkAction;
  }();
  Citrus.Actions.Platform.VisitLinkAction = VisitLinkAction;
}).call(this);
