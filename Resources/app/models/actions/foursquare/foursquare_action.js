(function() {
  var FoursquareAction;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  FoursquareAction = function() {
    function FoursquareAction() {
      FoursquareAction.__super__.constructor.apply(this, arguments);
    }
    __extends(FoursquareAction, Citrus.AccountBasedAction);
    FoursquareAction.declares = [];
    FoursquareAction.prototype.type = "FoursquareAction";
    FoursquareAction.prototype.buttonText = "Check In";
    FoursquareAction.prototype.accountType = "FoursquareAccount";
    FoursquareAction.prototype.tableViewRow = "FoursquareActionTableViewRow";
    FoursquareAction.prototype.readyToRun = function(account) {
      if (!account.isAuthorized()) {
        Ti.API.debug("Trying to run action on non authorized account!");
        return false;
      } else {
        return true;
      }
    };
    return FoursquareAction;
  }();
  Citrus.FoursquareAction = FoursquareAction;
  Ti.include('/app/models/actions/foursquare/check_in_action.js');
  Ti.include('/app/models/actions/foursquare/send_friend_request_action.js');
}).call(this);
