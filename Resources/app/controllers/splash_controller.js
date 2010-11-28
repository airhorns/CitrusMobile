(function() {
  var SplashController;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Ti.include("/app/views/splash/splash_window.js");
  SplashController = function() {
    function SplashController(codeData, accountStore) {
      this.takeActionFromRow = __bind(this.takeActionFromRow, this);;      this.store = accountStore;
      this.codeData = codeData;
      this.window = new Citrus.SplashWindow(this);
      root.tabGroup.activeTab.open(this.window.win, {
        animated: true
      });
    }
    __extends(SplashController, Citrus.Controller);
    SplashController.prototype.tryToShow = function() {
      d("Trying to show " + this.codeData);
      this.window.showLoading();
      return Citrus.Splash.newFromDecodedData(this.codeData, __bind(function(splash) {
        d("Found a splash in the decoded data, with shortcode " + splash.shortcode);
        this.splash = splash;
        this.splash.actions = this._prepareActions(this.splash.actions);
        this.fireEvent("splash:found", {
          splash: this.splash
        });
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
      if (action.requiresAccount()) {
        return this.takeAccountBasedActionFromRow(row, e);
      } else {
        return this.takeAccountlessActionFromRow(row, e);
      }
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
          var account, _i, _len, _results;
          if (e.index === cancel_index) {
            return Titanium.API.debug("Account select dialog was canceled.");
          } else if (e.index === all_index) {
            _results = [];
            for (_i = 0, _len = accounts.length; _i < _len; _i++) {
              account = accounts[_i];
              _results.push(runAction(account));
            }
            return _results;
          } else {
            account = accounts[e.index];
            if (account != null) {
              return runAction(account);
            }
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
    SplashController.prototype._prepareActions = function(actions) {
      var action, _i, _len;
      for (_i = 0, _len = actions.length; _i < _len; _i++) {
        action = actions[_i];
        if (action.requiresResponders()) {
          action.respondWith(this._actionSuccess, this._actionFailure);
        }
      }
      return actions;
    };
    return SplashController;
  }();
  Citrus.SplashController = SplashController;
}).call(this);
