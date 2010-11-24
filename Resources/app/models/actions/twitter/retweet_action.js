(function() {
  var RetweetAction;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  RetweetAction = function() {
    function RetweetAction() {
      RetweetAction.__super__.constructor.apply(this, arguments);
    }
    __extends(RetweetAction, Citrus.TwitterAction);
    RetweetAction.prototype.type = "TwitterRetweetAction";
    RetweetAction.prototype.buttonText = "Retweet";
    RetweetAction.declares = ["status_id"];
    RetweetAction.prototype.action = function(account, success, failure) {
      return account.api.retweet(this.status_id, success, failure);
    };
    return RetweetAction;
  }();
  Citrus.Actions.Twitter.Retweet = RetweetAction;
}).call(this);
