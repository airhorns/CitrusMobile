(function() {
  var FacebookActionTableViewRow;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  FacebookActionTableViewRow = function() {
    return Citrus.ActionRows.ActionTableViewRow.apply(this, arguments);
  };
  __extends(FacebookActionTableViewRow, Citrus.ActionRows.ActionTableViewRow);
  FacebookActionTableViewRow.prototype.type = "FacebookActionTableViewRow";
  FacebookActionTableViewRow.prototype.buttonText = function() {
    return this.action.buttonText;
  };
  Citrus.registerActionViewRow(FacebookActionTableViewRow);
}).call(this);
