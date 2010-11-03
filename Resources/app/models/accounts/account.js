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
    return Citrus.PersistedObject.apply(this, arguments);
  };
  __extends(Account, Citrus.PersistedObject);
  Account.prototype.type = "GenericAccount";
  Account.prototype.lastSynched = false;
  Account.prototype.refreshInterval = 1000 * 60 * 3;
  Account.prototype.isAuthorized = function() {
    return false;
  };
  Account.prototype.authorize = function(callback) {
    this._authCallback = callback;
    this.fireEvent("authorization:start");
    return true;
  };
  Account.prototype.completeAuthorization = function() {
    var _ref;
    if (typeof (_ref = this._authCallback) !== "undefined" && _ref !== null) {
      this._authCallback(this);
    }
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
