(function() {
  var TwitterAccountTableViewRow;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  TwitterAccountTableViewRow = function() {
    function TwitterAccountTableViewRow(account) {
      var realName, screenName;
      TwitterAccountTableViewRow.__super__.constructor.apply(this, arguments);
      screenName = Ti.UI.createLabel({
        color: '#000',
        text: "@" + this.account.screenName,
        font: {
          fontSize: 20,
          fontWeight: 'bold'
        },
        top: 5,
        left: 70,
        height: 'auto',
        minimumFontSize: 13,
        width: 240
      });
      this.row.add(screenName);
      if (this.account.name != null) {
        realName = Ti.UI.createLabel({
          color: '#333',
          text: this.account.name,
          font: {
            fontSize: 15
          },
          top: 30,
          left: 70,
          height: 'auto',
          width: 'auto'
        });
        this.row.add(realName);
      }
    }
    __extends(TwitterAccountTableViewRow, Citrus.AccountTableViewRow);
    return TwitterAccountTableViewRow;
  }();
  Citrus.TwitterAccountTableViewRow = TwitterAccountTableViewRow;
}).call(this);
