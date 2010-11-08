(function() {
  var CheckInAction;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  CheckInAction = function() {
    return Citrus.FoursquareAction.apply(this, arguments);
  };
  __extends(CheckInAction, Citrus.FoursquareAction);
  CheckInAction.declares = ["placeId"];
  CheckInAction.prototype.type = "FoursquareCheckInAction";
  CheckInAction.prototype.buttonText = "Check In";
  CheckInAction.prototype.action = function(account, success, failure) {
    return success();
  };
  Citrus.Actions.Foursquare.CheckInAction = CheckInAction;
}).call(this);
