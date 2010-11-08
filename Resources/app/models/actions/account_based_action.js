(function() {
  var AccountBasedAction;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  AccountBasedAction = function() {
    return Citrus.Action.apply(this, arguments);
  };
  __extends(AccountBasedAction, Citrus.Action);
  AccountBasedAction.prototype.requiresAccount = function() {
    return true;
  };
  AccountBasedAction.prototype.readyToRun = function(account) {
    return true;
  };
  AccountBasedAction.prototype.run = function(account, success, failure) {
    return this.readyToRun(account) ? this.action(account, success, failure) : this.failure(null, "Not ready to run!");
  };
  AccountBasedAction.prototype.action = function(account, success, failure) {
    return success();
  };
  Citrus.AccountBasedAction = AccountBasedAction;
}).call(this);
