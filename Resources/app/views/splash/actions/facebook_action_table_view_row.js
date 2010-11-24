(function() {
  var FacebookActionTableViewRow;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  FacebookActionTableViewRow = function() {
    function FacebookActionTableViewRow() {
      FacebookActionTableViewRow.__super__.constructor.apply(this, arguments);
    }
    __extends(FacebookActionTableViewRow, Citrus.ActionRows.ActionTableViewRow);
    FacebookActionTableViewRow.prototype.type = "FacebookActionTableViewRow";
    FacebookActionTableViewRow.prototype.buttonText = function() {
      return this.action.buttonText;
    };
    return FacebookActionTableViewRow;
  }();
  Citrus.registerActionViewRow(FacebookActionTableViewRow);
}).call(this);
