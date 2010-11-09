(function() {
  var DonateAction;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  DonateAction = function() {
    return Citrus.PaypalAction.apply(this, arguments);
  };
  __extends(DonateAction, Citrus.PaypalAction);
  DonateAction.declares = ["amount", "recipient", "merchantName"];
  DonateAction.prototype.type = "PaypalDonateAction";
  Citrus.Actions.Paypal.DonateAction = DonateAction;
}).call(this);
