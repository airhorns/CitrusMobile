(function() {
  var FollowAction;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  FollowAction = function() {
    return Citrus.TwitterAction.apply(this, arguments);
  };
  __extends(FollowAction, Citrus.TwitterAction);
  FollowAction.declares = ["followeeId"];
  FollowAction.prototype.type = "TwitterFollowAction";
  FollowAction.prototype.buttonText = "Follow";
  FollowAction.prototype.action = function(account, success, failure) {
    return account.api.addFriend(this.followeeId, success, failure);
  };
  Citrus.Actions.Twitter.FollowAction = FollowAction;
}).call(this);
