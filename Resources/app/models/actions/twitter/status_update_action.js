(function() {
  var StatusUpdateAction;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  StatusUpdateAction = function() {
    function StatusUpdateAction() {
      StatusUpdateAction.__super__.constructor.apply(this, arguments);
    }
    __extends(StatusUpdateAction, Citrus.TwitterAction);
    StatusUpdateAction.prototype.type = "TwitterStatusUpdateAction";
    StatusUpdateAction.prototype.buttonText = "Tweet";
    StatusUpdateAction.declares = ["text", "in_reply_to_id"];
    StatusUpdateAction.prototype.action = function(account, success, failure) {
      return account.api.update(this.text, null, this.in_reply_to_id, success, failure);
    };
    return StatusUpdateAction;
  }();
  Citrus.Actions.Twitter.StatusUpdateAction = StatusUpdateAction;
}).call(this);
