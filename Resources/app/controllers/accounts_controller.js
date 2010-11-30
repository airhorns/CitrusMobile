(function() {
  var AccountsController;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Ti.include('/app/controllers/oauthorization_controller.js');
  Ti.include('/app/controllers/xauthorization_controller.js');
  Ti.include("/app/models/accounts/account.js");
  Ti.include("/app/models/accounts/account_set.js");
  Ti.include("/app/views/accounts/accounts_table_view_window.js");
  Ti.include("/app/views/accounts/account_table_view_row.js");
  Ti.include("/app/views/accounts/new_account_select_window.js");
  AccountsController = function() {
    function AccountsController(store) {
      var account, _i, _len, _ref;
      this.store = store;
      _ref = this.store.accounts;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        account = _ref[_i];
        this.watchAccount(account);
      }
      this.window = new Citrus.AccountsTableViewWindow(this, this.store.accounts);
      setTimeout(function() {
        return root.fireEvent("synch:start", {
          source: "accounts controller"
        });
      }, 500);
    }
    __extends(AccountsController, Citrus.Controller);
    AccountsController.prototype.watchedAccounts = [];
    AccountsController.prototype.addNewAccount = function() {
      var _ref;
      if (!Titanium.Network.online) {
        alert("You aren't connected to the internet right now, so you won't be able to connect authorize the account. Please connect to the internet and try again.");
        return false;
      }
      (_ref = this.selectWindow) != null ? _ref : this.selectWindow = new Citrus.NewAccountSelectWindow(this, __bind(function(type) {
        return this.addNewAccountOfType(type);
      }, this));
      return root.tabGroup.activeTab.open(this.selectWindow.win, {
        animated: true
      });
    };
    AccountsController.prototype.addNewAccountOfType = function(type, callback) {
      var account, success;
      if (_.isFunction(type)) {
        account = new type();
      } else {
        account = new Citrus[type]();
      }
      if ((account != null) && account.valid) {
        this.watchAccount(account);
        success = __bind(function() {
          if (this.selectWindow != null) {
            this.selectWindow.win.close({
              animated: false
            });
          }
          account.synch();
          account.removeEventListener("authorization:success", success);
          if (callback != null) {
            return callback(account);
          }
        }, this);
        account.addEventListener("authorization:success", success);
        account.authorize();
        d("Created account and added authorization success listener");
        return account;
      } else {
        er("Couldn't create a new account of type " + type);
        er(account);
        return false;
      }
    };
    AccountsController.prototype.watchAccount = function(account) {
      if (_.include(this.watchedAccounts, account)) {
        return true;
      }
      this.watchedAccounts.push(account);
      account.addEventListener("authorization:error", __bind(function(e) {
        Ti.API.debug("Authorization Error!");
        return alert("There was an error authorizing your account. Please try again.");
      }, this));
      account.addEventListener("state:updating", __bind(function(e) {
        return this.window.showLoading();
      }, this));
      account.addEventListener("state:ready", __bind(function(e) {
        d("Account state is ready");
        if ((account.displayed != null) && account.displayed) {
          this.window.updateAccountDisplay(account);
        } else {
          this.store.addAccount(account);
          this.window.displayAccount(account);
        }
        return this.window.hideLoading();
      }, this));
      account.addEventListener("state:error", __bind(function(e) {
        this.window.hideLoading();
        return alert("There was an error retrieving your details. Please try again.");
      }, this));
      return account.addEventListener("state:deleted", __bind(function(e) {
        this.store.removeAccount(account);
        delete account;
        return delete e.row.wrapper;
      }, this));
    };
    return AccountsController;
  }();
  Citrus.AccountsController = AccountsController;
}).call(this);
