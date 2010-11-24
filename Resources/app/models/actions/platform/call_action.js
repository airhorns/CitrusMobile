(function() {
  var CallAction;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  CallAction = function() {
    function CallAction() {
      CallAction.__super__.constructor.apply(this, arguments);
    }
    __extends(CallAction, Citrus.PlatformAction);
    CallAction.declares = ["phoneNumber"];
    CallAction.prototype.type = "PlatformCallAction";
    CallAction.prototype.buttonText = "Call";
    CallAction.prototype.iconName = "phone";
    CallAction.prototype.action = function(success, failure) {
      return Titanium.Platform.openURL("tel:" + this.phoneNumber);
    };
    return CallAction;
  }();
  Citrus.Actions.Platform.CallAction = CallAction;
}).call(this);
