(function() {
  var CheckInAction;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  CheckInAction = function() {
    function CheckInAction() {
      CheckInAction.__super__.constructor.apply(this, arguments);
    }
    __extends(CheckInAction, Citrus.FoursquareAction);
    CheckInAction.declares = ["venueId"];
    CheckInAction.prototype.type = "FoursquareCheckInAction";
    CheckInAction.prototype.buttonText = "Check In";
    CheckInAction.prototype.action = function(account, success, failure) {
      return account.api.checkIn(this.venueId, function(e) {
        return success(e);
      }, function(e) {
        return failure(e);
      });
    };
    return CheckInAction;
  }();
  Citrus.Actions.Foursquare.CheckInAction = CheckInAction;
}).call(this);
