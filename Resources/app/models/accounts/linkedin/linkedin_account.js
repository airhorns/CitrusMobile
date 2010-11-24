(function() {
  var LinkedInAccount;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  LinkedInAccount = function() {
    function LinkedInAccount() {
      LinkedInAccount.__super__.constructor.apply(this, arguments);
    }
    __extends(LinkedInAccount, Citrus.Account);
    LinkedInAccount.prototype.type = "LinkedInAccount";
    return LinkedInAccount;
  }();
  Citrus.registerAccount(LinkedInAccount);
}).call(this);
