(function() {
  var SendFriendRequestAction;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  SendFriendRequestAction = function() {
    function SendFriendRequestAction() {
      SendFriendRequestAction.__super__.constructor.apply(this, arguments);
    }
    __extends(SendFriendRequestAction, Citrus.FoursquareAction);
    SendFriendRequestAction.declares = ["userId"];
    SendFriendRequestAction.prototype.type = "FoursquareSendFriendRequestAction";
    SendFriendRequestAction.prototype.buttonText = "Add";
    SendFriendRequestAction.prototype.action = function(account, success, failure) {
      return account.api.sendFriendRequest(this.userId, function(e) {
        return success(e);
      }, function(e) {
        return failure(e);
      });
    };
    return SendFriendRequestAction;
  }();
  Citrus.Actions.Foursquare.SendFriendRequestAction = SendFriendRequestAction;
}).call(this);
