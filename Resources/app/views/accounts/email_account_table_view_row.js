(function() {
  var EmailAccountTableViewRow;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  EmailAccountTableViewRow = function() {
    function EmailAccountTableViewRow(account) {
      var email;
      EmailAccountTableViewRow.__super__.constructor.apply(this, arguments);
      email = Ti.UI.createLabel({
        color: '#000',
        text: this.account.email,
        font: {
          fontSize: 20,
          fontWeight: 'bold'
        },
        top: 3,
        left: 70,
        height: 'auto',
        minimumFontSize: 13,
        width: 240
      });
      this.row.add(email);
    }
    __extends(EmailAccountTableViewRow, Citrus.AccountTableViewRow);
    return EmailAccountTableViewRow;
  }();
  Citrus.EmailAccountTableViewRow = EmailAccountTableViewRow;
}).call(this);
