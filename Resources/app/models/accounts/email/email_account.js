(function() {
  var EmailAccount;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Ti.include('/app/controllers/email_collection_controller.js');
  EmailAccount = function() {
    function EmailAccount() {
      EmailAccount.__super__.constructor.apply(this, arguments);
    }
    __extends(EmailAccount, Citrus.Account);
    EmailAccount.prototype.type = "EmailAccount";
    EmailAccount.prototype.persistableAttributes = ["email"];
    EmailAccount.prototype.synch = function() {
      this.fireEvent("state:updating");
      return this.fireEvent("state:ready");
    };
    EmailAccount.prototype.isAuthorized = function() {
      return true;
    };
    EmailAccount.prototype.authorize = function() {
      var canceled, controller, gotData;
      controller = {};
      gotData = __bind(function(data) {
        d(data);
        this.email = data.email;
        this.completeAuthorization();
        return controller.destroy();
      }, this);
      canceled = __bind(function(e) {
        this.fireEvent("authorization:error", e);
        return this.fireEvent("authorization:complete");
      }, this);
      return controller = new Citrus.EmailCollectionController(gotData, canceled);
    };
    return EmailAccount;
  }();
  Citrus.registerAccount(EmailAccount);
}).call(this);
