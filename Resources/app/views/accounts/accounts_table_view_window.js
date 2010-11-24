(function() {
  var AccountsTableViewWindow;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  AccountsTableViewWindow = function() {
    function AccountsTableViewWindow(controller, initialAccounts) {
      var a, rows, _i, _len, _results;
      AccountsTableViewWindow.__super__.constructor.apply(this, arguments);
      this.win = Ti.UI.createWindow({
        title: "Accounts",
        backgroundColor: '#fff'
      });
      this.addButton = Titanium.UI.createButton({
        systemButton: Titanium.UI.iPhone.SystemButton.ADD
      });
      this.addButton.addEventListener('click', __bind(function() {
        return controller.addNewAccount();
      }, this));
      rows = function() {
        _results = [];
        for (_i = 0, _len = initialAccounts.length; _i < _len; _i++) {
          a = initialAccounts[_i];
          a.displayed = true;
          _results.push(this._getTableRowFromAccount(a));
        }
        return _results;
      }.call(this);
      this.table = Titanium.UI.createTableView({
        data: rows,
        rowHeight: 60,
        editable: true
      });
      this.win.add(this.table);
      this.win.rightNavButton = this.addButton;
      this.loading_indicator = Titanium.UI.createActivityIndicator();
      this.loading_indicator.style = Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN;
      this.loading_indicator.font = {
        fontFamily: 'Helvetica Neue',
        fontSize: 15,
        fontWeight: 'bold'
      };
      this.loading_indicator.color = 'white';
      this.loading_indicator.message = 'Loading...';
      this.table.addEventListener("delete", function(e) {
        if (e.row.wrapper != null) {
          return e.row.wrapper.account.fireEvent("state:deleted", e);
        }
      });
    }
    __extends(AccountsTableViewWindow, Citrus.GenericWindow);
    AccountsTableViewWindow.prototype.showLoading = function() {
      this.win.setToolbar([this.loading_indicator], {
        animated: true
      });
      this.loading_indicator.show();
      return setTimeout(__bind(function() {
        return this.hideLoading();
      }, this), 3000);
    };
    AccountsTableViewWindow.prototype.hideLoading = function() {
      this.loading_indicator.hide();
      return this.win.setToolbar(null, {
        animated: true
      });
    };
    AccountsTableViewWindow.prototype.displayAccount = function(account) {
      account.displayed = true;
      return this._addAccountToTable(account);
    };
    AccountsTableViewWindow.prototype.updateAccountDisplay = function(account) {
      return Ti.API.error("Updating account display -> NOT IMPLEMENTED");
    };
    AccountsTableViewWindow.prototype._addAccountToTable = function(account) {
      var row;
      row = this._getTableRowFromAccount(account);
      if (row) {
        return this.table.appendRow(row, {
          animated: true
        });
      } else {
        er("Couldn't get the account's table view row! Account is: ");
        d(account);
        return account.displayed = false;
      }
    };
    AccountsTableViewWindow.prototype._getTableRowFromAccount = function(account) {
      var klass, rowView;
      klass = Citrus[account.type + "TableViewRow"];
      if (klass != null) {
        rowView = new klass(account);
        return rowView.row;
      } else {
        return false;
      }
    };
    return AccountsTableViewWindow;
  }();
  Citrus.AccountsTableViewWindow = AccountsTableViewWindow;
}).call(this);
