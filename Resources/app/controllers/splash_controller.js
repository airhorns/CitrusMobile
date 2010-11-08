(function() {
  var SplashController;
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
  Ti.include("/app/views/splash/splash_window.js");
  SplashController = function(codeData, accountStore) {
    var _this;
    _this = this;
    this.takeActionFromRow = function(){ return SplashController.prototype.takeActionFromRow.apply(_this, arguments); };
    this.store = accountStore;
    this.codeData = codeData;
    this.window = new Citrus.SplashWindow(this);
    root.tabGroup.activeTab.open(this.window.win, {
      animated: true
    });
    this.tryToShow();
    return this;
  };
  __extends(SplashController, Citrus.Controller);
  SplashController.prototype.tryToShow = function() {
    d("Trying to show " + this.codeData);
    this.window.showLoading();
    return Citrus.Splash.newFromDecodedData(this.codeData, __bind(function(splash) {
      d("Found a splash in the decoded data, with shortcode " + splash.shortcode);
      this.splash = splash;
      return this.window.displaySplash(this.splash);
    }, this), __bind(function(xhr, status, error) {
      var msg, retry;
      e("Error finding a Citrus splash from the decoded data. Status: " + status);
      e(xhr.responseText);
      if (xhr) {
        if (!Titanium.Network.online) {
          msg = "You need to be connected to the internet to scan this code. Please connect and then retry.";
          retry = true;
        } else if (xhr.status === 404) {
          msg = "This code couldn't be found in our database, probably because it's been deleted!";
          retry = false;
        } else {
          msg = "There was an error fetching this code from the server! Please try again.";
          retry = true;
        }
      } else {
        if (status === "not_citrus_code") {
          this.window.displayDecodedData(this.codeData);
          return true;
        }
      }
      this.window.displayError(msg, retry, __bind(function() {
        return this.tryToShow();
      }, this));
      return false;
    }, this));
  };
  SplashController.prototype.takeActionFromRow = function(row, e) {
    var action;
    action = row.action;
    return action.requiresAccount() ? this.takeAccountBasedActionFromRow(row, e) : this.takeAccountlessActionFromRow(row, e);
  };
  SplashController.prototype.takeAccountlessActionFromRow = function(row, e) {
    var action;
    action = row.action;
    return action.run(_.bind(this._actionSuccess, this, row), _.bind(this._actionFailure, this, row));
  };
  SplashController.prototype.takeAccountBasedActionFromRow = function(row, e) {
    var accounts, action, all_index, cancel_index, opts, runAction;
    action = row.action;
    accounts = this.possibleAccountsForAction(action);
    runAction = __bind(function(account) {
      row.displayInProgress();
      return action.run(account, _.bind(this._actionSuccess, this, row), _.bind(this._actionFailure, this, row));
    }, this);
    if (accounts.length > 1) {
      opts = _.map(accounts, function(account) {
        return account.screenName;
      });
      if (_.isArray(opts)) {
        opts.push("All");
        all_index = opts.length - 1;
        opts.push("Cancel");
        cancel_index = opts.length - 1;
      }
      this.dialog = Titanium.UI.createOptionDialog({
        options: opts,
        title: "Select which accounts to " + row.text() + ".",
        destructive: all_index,
        cancel: cancel_index
      });
      this.dialog.addEventListener("click", __bind(function(e) {
        var _i, _len, _ref, _result, account;
        if (e.index === cancel_index) {
          return Titanium.API.debug("Account select dialog was canceled.");
        } else if (e.index === all_index) {
          _result = []; _ref = accounts;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            account = _ref[_i];
            _result.push(runAction(account));
          }
          return _result;
        } else {
          account = accounts[e.index];
          return (typeof account !== "undefined" && account !== null) ? runAction(account) : null;
        }
      }, this));
      return this.dialog.show();
    } else {
      runAction(accounts[0]);
      return true;
    }
  };
  SplashController.prototype.isActionTakeable = function(action) {
    if (action.requiresAccount()) {
      return _.any(this.store.accounts, __bind(function(account) {
        return this._canAccountRunAction(account, action);
      }, this));
    } else {
      return action.readyToRun();
    }
  };
  SplashController.prototype.possibleAccountsForAction = function(action) {
    return _.select(this.store.accounts, __bind(function(account) {
      return this._canAccountRunAction(account, action);
    }, this));
  };
  SplashController.prototype._canAccountRunAction = function(account, action) {
    return action.accountType === account.type;
  };
  SplashController.prototype._actionSuccess = function(row, e) {
    Titanium.API.debug("Action complete!");
    return row.displaySuccess();
  };
  SplashController.prototype._actionFailure = function(row, xhr, status, error) {
    Titanium.API.error("Action failed!");
    Titanium.API.error(status);
    d(error);
    d(xhr.responseText);
    return row.displayError();
  };
  Citrus.SplashController = SplashController;
}).call(this);
