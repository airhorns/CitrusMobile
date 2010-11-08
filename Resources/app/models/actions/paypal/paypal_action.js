(function() {
  var PaypalAction;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  PaypalAction = function() {
    return Citrus.RespondingAction.apply(this, arguments);
  };
  __extends(PaypalAction, Citrus.RespondingAction);
  PaypalAction.declares = [];
  PaypalAction.prototype.type = "PaypalAction";
  PaypalAction.prototype.buttonText = "PaypalAction";
  PaypalAction.prototype.tableViewRow = "PaypalActionTableViewRow";
  Citrus.PaypalAction = PaypalAction;
  Ti.include("/app/models/actions/paypal/donate_action.js");
}).call(this);
