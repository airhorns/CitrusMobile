(function() {
  var AccountActionTableViewRow;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  AccountActionTableViewRow = function() {
    return Citrus.ActionRows.ActionTableViewRow.apply(this, arguments);
  };
  __extends(AccountActionTableViewRow, Citrus.ActionRows.ActionTableViewRow);
  AccountActionTableViewRow.prototype.type = "AccountActionTableViewRow";
  AccountActionTableViewRow.prototype.buttonText = function() {
    return this.action.buttonText;
  };
  Citrus.registerActionViewRow(AccountActionTableViewRow);
}).call(this);
