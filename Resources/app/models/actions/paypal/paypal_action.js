(function() {
  var PaypalAction;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  PaypalAction = function() {
    function PaypalAction() {
      PaypalAction.__super__.constructor.apply(this, arguments);
    }
    __extends(PaypalAction, Citrus.ResponderAction);
    PaypalAction.declares = [];
    PaypalAction.prototype.type = "PaypalAction";
    PaypalAction.prototype.buttonText = "PaypalAction";
    PaypalAction.prototype.tableViewRow = "PaypalActionTableViewRow";
    return PaypalAction;
  }();
  Citrus.PaypalAction = PaypalAction;
  Ti.include("/app/models/actions/paypal/donate_action.js");
}).call(this);
