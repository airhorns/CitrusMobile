(function() {
  var TwitterAction;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  TwitterAction = function() {
    function TwitterAction() {
      TwitterAction.__super__.constructor.apply(this, arguments);
    }
    __extends(TwitterAction, Citrus.AccountBasedAction);
    TwitterAction.declares = [];
    TwitterAction.prototype.type = "TwitterAction";
    TwitterAction.prototype.buttonText = "TwitterAction";
    TwitterAction.prototype.accountType = "TwitterAccount";
    TwitterAction.prototype.tableViewRow = "AccountActionTableViewRow";
    TwitterAction.prototype.readyToRun = function(account) {
      if (!account.isAuthorized()) {
        Ti.API.debug("Trying to run action on non authorized account!");
        return false;
      } else {
        return true;
      }
    };
    return TwitterAction;
  }();
  Citrus.TwitterAction = TwitterAction;
  Ti.include("/app/models/actions/twitter/follow_action.js");
  Ti.include("/app/models/actions/twitter/retweet_action.js");
  Ti.include("/app/models/actions/twitter/status_update_action.js");
}).call(this);
