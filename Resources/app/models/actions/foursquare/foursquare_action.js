(function() {
  var FoursquareAction;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  FoursquareAction = function() {
    return Citrus.AccountBasedAction.apply(this, arguments);
  };
  __extends(FoursquareAction, Citrus.AccountBasedAction);
  FoursquareAction.declares = [];
  FoursquareAction.prototype.type = "FoursquareAction";
  FoursquareAction.prototype.buttonText = "Check In";
  FoursquareAction.prototype.accountType = "FoursquareAccount";
  FoursquareAction.prototype.tableViewRow = "AccountActionTableViewRow";
  FoursquareAction.prototype.readyToRun = function(account) {
    if (!(account.isAuthorized())) {
      Ti.API.debug("Trying to run action on non authorized account!");
      return false;
    } else {
      return true;
    }
  };
  Citrus.FoursquareAction = FoursquareAction;
  Ti.include('/app/models/actions/foursquare/check_in_action.js');
}).call(this);
