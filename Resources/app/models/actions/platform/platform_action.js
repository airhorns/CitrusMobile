(function() {
  var PlatformAction;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  PlatformAction = function() {
    function PlatformAction() {
      PlatformAction.__super__.constructor.apply(this, arguments);
    }
    __extends(PlatformAction, Citrus.AccountlessAction);
    PlatformAction.declares = [];
    PlatformAction.prototype.type = "PlatformAction";
    PlatformAction.prototype.buttonText = "PlatformAction";
    PlatformAction.prototype.tableViewRow = "PlatformActionTableViewRow";
    PlatformAction.prototype.readyToRun = function() {
      return true;
    };
    return PlatformAction;
  }();
  Citrus.PlatformAction = PlatformAction;
  Ti.include("/app/models/actions/platform/call_action.js");
  Ti.include("/app/models/actions/platform/visit_link_action.js");
}).call(this);
