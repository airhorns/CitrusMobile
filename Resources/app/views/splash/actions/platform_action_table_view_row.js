(function() {
  var PlatformActionTableViewRow;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  PlatformActionTableViewRow = function() {
    return Citrus.ActionRows.ActionTableViewRow.apply(this, arguments);
  };
  __extends(PlatformActionTableViewRow, Citrus.ActionRows.ActionTableViewRow);
  PlatformActionTableViewRow.prototype.type = "PlatformActionTableViewRow";
  PlatformActionTableViewRow.prototype.icon = function() {
    return Citrus.getIconPath(this.action.iconName);
  };
  Citrus.registerActionViewRow(PlatformActionTableViewRow);
}).call(this);
