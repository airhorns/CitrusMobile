(function() {
  var AccountlessAction;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  AccountlessAction = function() {
    return Citrus.Action.apply(this, arguments);
  };
  __extends(AccountlessAction, Citrus.Action);
  AccountlessAction.prototype.requiresAccount = function() {
    return false;
  };
  Citrus.AccountlessAction = AccountlessAction;
}).call(this);
