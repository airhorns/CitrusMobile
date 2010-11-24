(function() {
  var DonateAction;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  DonateAction = function() {
    function DonateAction() {
      DonateAction.__super__.constructor.apply(this, arguments);
    }
    __extends(DonateAction, Citrus.PaypalAction);
    DonateAction.declares = ["amount", "recipient", "merchantName"];
    DonateAction.prototype.type = "PaypalDonateAction";
    return DonateAction;
  }();
  Citrus.Actions.Paypal.DonateAction = DonateAction;
}).call(this);
