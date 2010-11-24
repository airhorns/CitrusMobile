(function() {
  var AccountActionTableViewRow;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  AccountActionTableViewRow = function() {
    function AccountActionTableViewRow() {
      AccountActionTableViewRow.__super__.constructor.apply(this, arguments);
    }
    __extends(AccountActionTableViewRow, Citrus.ActionRows.ActionTableViewRow);
    AccountActionTableViewRow.prototype.type = "AccountActionTableViewRow";
    AccountActionTableViewRow.prototype.buttonText = function() {
      return this.action.buttonText;
    };
    return AccountActionTableViewRow;
  }();
  Citrus.registerActionViewRow(AccountActionTableViewRow);
}).call(this);
