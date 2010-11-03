(function() {
  var FoursquareAccount;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  FoursquareAccount = function() {
    return Citrus.Account.apply(this, arguments);
  };
  __extends(FoursquareAccount, Citrus.Account);
  FoursquareAccount.prototype.type = "FoursquareAccount";
  Citrus.registerAccount(FoursquareAccount);
}).call(this);
