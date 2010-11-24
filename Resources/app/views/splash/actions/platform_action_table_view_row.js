(function() {
  var PlatformActionTableViewRow;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  PlatformActionTableViewRow = function() {
    function PlatformActionTableViewRow() {
      PlatformActionTableViewRow.__super__.constructor.apply(this, arguments);
    }
    __extends(PlatformActionTableViewRow, Citrus.ActionRows.ActionTableViewRow);
    PlatformActionTableViewRow.prototype.type = "PlatformActionTableViewRow";
    PlatformActionTableViewRow.prototype.icon = function() {
      return Citrus.getIconPath(this.action.iconName);
    };
    return PlatformActionTableViewRow;
  }();
  Citrus.registerActionViewRow(PlatformActionTableViewRow);
}).call(this);
