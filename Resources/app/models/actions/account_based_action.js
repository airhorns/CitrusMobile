(function() {
  var AccountBasedAction;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  AccountBasedAction = function() {
    function AccountBasedAction() {
      AccountBasedAction.__super__.constructor.apply(this, arguments);
    }
    __extends(AccountBasedAction, Citrus.Action);
    AccountBasedAction.prototype.requiresAccount = function() {
      return true;
    };
    AccountBasedAction.prototype.readyToRun = function(account) {
      return true;
    };
    AccountBasedAction.prototype.run = function(account, success, failure) {
      if (this.readyToRun(account)) {
        return this.action(account, success, failure);
      } else {
        return this.failure(null, "Not ready to run!");
      }
    };
    AccountBasedAction.prototype.action = function(account, success, failure) {
      return success();
    };
    return AccountBasedAction;
  }();
  Citrus.AccountBasedAction = AccountBasedAction;
}).call(this);
