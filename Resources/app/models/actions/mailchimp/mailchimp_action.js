(function() {
  var MailchimpAction;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  MailchimpAction = function() {
    function MailchimpAction() {
      MailchimpAction.__super__.constructor.apply(this, arguments);
    }
    __extends(MailchimpAction, Citrus.AccountBasedAction);
    MailchimpAction.declares = ["apikey"];
    MailchimpAction.prototype.type = "MailchimpAction";
    MailchimpAction.prototype.buttonText = "MailchimpAction";
    MailchimpAction.prototype.accountType = "EmailAccount";
    MailchimpAction.prototype.tableViewRow = "AccountActionTableViewRow";
    MailchimpAction.prototype.baseURL = "http://us2.api.mailchimp.com/1.3/";
    MailchimpAction.prototype.readyToRun = function(account) {
      return true;
    };
    return MailchimpAction;
  }();
  Citrus.MailchimpAction = MailchimpAction;
  Ti.include("/app/models/actions/mailchimp/subscribe_action.js");
}).call(this);
