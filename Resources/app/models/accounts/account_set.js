(function() {
  var AccountSet;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  AccountSet = function() {
    function AccountSet() {
      this.accounts = [];
      this.load();
    }
    __extends(AccountSet, Citrus.Object);
    AccountSet.prototype.load = function() {
      var account, accounts, datas, datum, _i, _len;
      if (!Ti.App.Properties.hasProperty(this.key())) {
        return [];
      }
      try {
        datas = JSON.parse(Ti.App.Properties.getString(this.key()));
      } catch (e) {
        Ti.API.error("Error parsing account set JSON from properties: ");
        Ti.API.error(e);
        return false;
      }
      datas != null ? datas : datas = [];
      accounts = [];
      for (_i = 0, _len = datas.length; _i < _len; _i++) {
        datum = datas[_i];
        account = Citrus.PersistedObject.loadFromPersistable(datum);
        if (account) {
          Ti.API.info("Loaded " + account.type + " from persistable.");
          accounts.push(account);
        }
      }
      this.accounts = accounts;
      return this.accounts;
    };
    AccountSet.prototype.save = function() {
      var account, persistable_accounts, _i, _len, _ref;
      Ti.API.debug("Saving accounts store.");
      persistable_accounts = [];
      _ref = this.accounts;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        account = _ref[_i];
        persistable_accounts.push(account.persistable());
      }
      return Ti.App.Properties.setString(this.key(), JSON.stringify(persistable_accounts));
    };
    AccountSet.prototype.key = function() {
      return "CitrusAccounts";
    };
    AccountSet.prototype.addAccount = function(account) {
      Ti.API.debug("Account Added to store.");
      this.accounts.push(account);
      return this.save();
    };
    AccountSet.prototype.removeAccount = function(account) {
      this.accounts = _.without(this.accounts, account);
      return this.save();
    };
    return AccountSet;
  }();
  Citrus.AccountSet = AccountSet;
}).call(this);
