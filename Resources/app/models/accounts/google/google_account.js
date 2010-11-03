(function() {
  var GoogleAccount;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  GoogleAccount = function() {
    return Citrus.Account.apply(this, arguments);
  };
  __extends(GoogleAccount, Citrus.Account);
  GoogleAccount.prototype.type = "GoogleAccount";
  Citrus.registerAccount(GoogleAccount);
}).call(this);
