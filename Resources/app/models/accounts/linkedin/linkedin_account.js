(function() {
  var LinkedInAccount;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  LinkedInAccount = function() {
    return Citrus.Account.apply(this, arguments);
  };
  __extends(LinkedInAccount, Citrus.Account);
  LinkedInAccount.prototype.type = "LinkedInAccount";
  Citrus.registerAccount(LinkedInAccount);
}).call(this);
