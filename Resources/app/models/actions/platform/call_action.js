(function() {
  var CallAction;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  CallAction = function() {
    return Citrus.PlatformAction.apply(this, arguments);
  };
  __extends(CallAction, Citrus.PlatformAction);
  CallAction.declares = ["phoneNumber"];
  CallAction.prototype.type = "PlatformCallAction";
  CallAction.prototype.buttonText = "Call";
  CallAction.prototype.iconName = "phone";
  CallAction.prototype.action = function(success, failure) {
    return Titanium.Platform.openURL("tel:" + this.phoneNumber);
  };
  Citrus.Actions.Platform.CallAction = CallAction;
}).call(this);
