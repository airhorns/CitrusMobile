(function() {
  var TwitterAction;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  TwitterAction = function() {
    return Citrus.AccountBasedAction.apply(this, arguments);
  };
  __extends(TwitterAction, Citrus.AccountBasedAction);
  TwitterAction.declares = [];
  TwitterAction.prototype.type = "TwitterAction";
  TwitterAction.prototype.buttonText = "TwitterAction";
  TwitterAction.prototype.accountType = "TwitterAccount";
  TwitterAction.prototype.tableViewRow = "AccountActionTableViewRow";
  TwitterAction.prototype.readyToRun = function(account) {
    if (!(account.isAuthorized())) {
      Ti.API.debug("Trying to run action on non authorized account!");
      return false;
    } else {
      return true;
    }
  };
  Citrus.TwitterAction = TwitterAction;
  Ti.include("/app/models/actions/twitter/follow_action.js");
  Ti.include("/app/models/actions/twitter/retweet_action.js");
  Ti.include("/app/models/actions/twitter/status_update_action.js");
}).call(this);
