(function() {
  var AccountTableViewRow;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  AccountTableViewRow = function() {
    function AccountTableViewRow(account) {
      this.account = account;
      this.row = this.getTableViewRowTemplate();
      this.row.className = account.type + "Row";
    }
    __extends(AccountTableViewRow, Citrus.Object);
    AccountTableViewRow.prototype.getTableViewRowTemplate = function() {
      var photo, row;
      row = Ti.UI.createTableViewRow();
      row.height = 60;
      row.wrapper = this;
      photo = Ti.UI.createView({
        backgroundImage: Citrus.getIconPath(this.account.type),
        top: 10,
        left: 15,
        height: 40,
        width: 40
      });
      row.add(photo);
      return row;
    };
    return AccountTableViewRow;
  }();
  Citrus.AccountTableViewRow = AccountTableViewRow;
  Ti.include("/app/views/accounts/twitter_account_table_view_row.js");
  Ti.include("/app/views/accounts/facebook_account_table_view_row.js");
  Ti.include("/app/views/accounts/foursquare_account_table_view_row.js");
  Ti.include("/app/views/accounts/email_account_table_view_row.js");
}).call(this);
