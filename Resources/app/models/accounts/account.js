(function() {
  var Account;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  Citrus.AccountTypes = [];
  Account = function() {
    Account.__super__.constructor.apply(this, arguments);
    this.valid = true;
    return this;
  };
  __extends(Account, Citrus.PersistedObject);
  Account.prototype.type = "GenericAccount";
  Account.prototype.lastSynched = false;
  Account.prototype.refreshInterval = 1000 * 60 * 3;
  Account.prototype.isAuthorized = function() {
    return false;
  };
  Account.prototype.authorize = function() {
    if (this.isAuthorized()) {
      return true;
    }
    this.fireEvent("authorization:start");
    return true;
  };
  Account.prototype.completeAuthorization = function() {
    this.fireEvent("authorization:success");
    this.fireEvent("authorization:complete");
    return true;
  };
  Citrus.Account = Account;
  Citrus.registerAccount = function(account_klass) {
    Citrus.AccountTypes.push(account_klass);
    return (Citrus[account_klass.prototype.type] = account_klass);
  };
  Ti.include("/app/models/accounts/twitter/twitter_account.js");
  Ti.include("/app/models/accounts/facebook/facebook_account.js");
  Ti.include("/app/models/accounts/google/google_account.js");
  Ti.include("/app/models/accounts/linkedin/linkedin_account.js");
}).call(this);
