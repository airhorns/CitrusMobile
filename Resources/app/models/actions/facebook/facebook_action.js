(function() {
  var FacebookAction;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  FacebookAction = function() {
    return Citrus.AccountBasedAction.apply(this, arguments);
  };
  __extends(FacebookAction, Citrus.AccountBasedAction);
  FacebookAction.declares = [];
  FacebookAction.prototype.type = "FacebookAction";
  FacebookAction.prototype.buttonText = "FacebookAction";
  FacebookAction.prototype.accountType = "FacebookAccount";
  FacebookAction.prototype.tableViewRow = "FacebookActionTableViewRow";
  Citrus.FacebookAction = FacebookAction;
  Ti.include("/app/models/actions/facebook/publish_stream_action.js");
}).call(this);
