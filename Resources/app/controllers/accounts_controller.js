(function() {
  var AccountsController;
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  }, __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  Ti.include('/app/controllers/oauthorization_controller.js');
  Ti.include('/app/controllers/xauthorization_controller.js');
  Ti.include("/app/models/accounts/account.js");
  Ti.include("/app/models/accounts/account_set.js");
  Ti.include("/app/views/accounts/accounts_table_view_window.js");
  Ti.include("/app/views/accounts/account_table_view_row.js");
  Ti.include("/app/views/accounts/new_account_select_window.js");
  AccountsController = function(store) {
    var _i, _len, _ref, account;
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
    return this;
  };
  __extends(AccountsController, Citrus.Controller);
  AccountsController.prototype.watchedAccounts = [];
  AccountsController.prototype.addNewAccount = function() {
    if (!Titanium.Network.online) {
      alert("You aren't connected to the internet right now, so you won't be able to connect authorize the account. Please connect to the internet and try again.");
      return false;
    }
    this.selectWindow = (typeof this.selectWindow !== "undefined" && this.selectWindow !== null) ? this.selectWindow : new Citrus.NewAccountSelectWindow(this, __bind(function(type) {
      return this.addNewAccountOfType(type);
    }, this));
    return root.tabGroup.activeTab.open(this.selectWindow.win, {
      animated: true
    });
  };
  AccountsController.prototype.addNewAccountOfType = function(type) {
    var account, success;
    if (_.isFunction(type)) {
      account = new type();
    } else {
      account = new Citrus[type]();
    }
    if ((typeof account !== "undefined" && account !== null) && account.valid) {
      this.watchAccount(account);
      success = __bind(function() {
        this.selectWindow.win.close({
          animated: false
        });
        account.synch();
        return account.removeEventListener("authorization:success", success);
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
      var _ref;
      d("Account state is ready");
      if ((typeof (_ref = account.displayed) !== "undefined" && _ref !== null) && account.displayed) {
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
  Citrus.AccountsController = AccountsController;
}).call(this);
