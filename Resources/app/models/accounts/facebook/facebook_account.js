(function() {
  var FacebookAccount;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  FacebookAccount = function() {
    return Citrus.Account.apply(this, arguments);
  };
  __extends(FacebookAccount, Citrus.Account);
  FacebookAccount.prototype.type = "FacebookAccount";
  Citrus.registerAccount(FacebookAccount);
}).call(this);
