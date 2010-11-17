(function() {
  var SendFriendRequestAction;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  SendFriendRequestAction = function() {
    return Citrus.FoursquareAction.apply(this, arguments);
  };
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
  Citrus.Actions.Foursquare.SendFriendRequestAction = SendFriendRequestAction;
}).call(this);
