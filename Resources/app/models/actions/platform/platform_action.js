(function() {
  var PlatformAction;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  PlatformAction = function() {
    return Citrus.AccountlessAction.apply(this, arguments);
  };
  __extends(PlatformAction, Citrus.AccountlessAction);
  PlatformAction.declares = [];
  PlatformAction.prototype.type = "PlatformAction";
  PlatformAction.prototype.buttonText = "PlatformAction";
  PlatformAction.prototype.tableViewRow = "PlatformActionTableViewRow";
  PlatformAction.prototype.readyToRun = function() {
    return true;
  };
  Citrus.PlatformAction = PlatformAction;
  Ti.include("/app/models/actions/platform/call_action.js");
  Ti.include("/app/models/actions/platform/visit_link_action.js");
}).call(this);
