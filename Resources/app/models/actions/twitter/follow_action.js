(function() {
  var FollowAction;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  FollowAction = function() {
    function FollowAction() {
      FollowAction.__super__.constructor.apply(this, arguments);
    }
    __extends(FollowAction, Citrus.TwitterAction);
    FollowAction.declares = ["followeeId"];
    FollowAction.prototype.type = "TwitterFollowAction";
    FollowAction.prototype.buttonText = "Follow";
    FollowAction.prototype.action = function(account, success, failure) {
      return account.api.addFriend(this.followeeId, success, function(xhr, status, error) {
        var msg;
        if (xhr != null) {
          d(xhr.responseText);
          if (xhr.responseText.match(/already on your list/)) {
            alert(account.screenName + " is already following this user!");
            return success({});
          }
        }
        try {
          msg = JSON.parse(xhr.responseText);
        } catch (e) {
          return failure(error);
        }
        if ((msg != null) && (msg.error != null)) {
          return failure(null, null, {
            alertText: msg.error
          });
        } else {
          return failure(error);
        }
      });
    };
    return FollowAction;
  }();
  Citrus.Actions.Twitter.FollowAction = FollowAction;
}).call(this);
