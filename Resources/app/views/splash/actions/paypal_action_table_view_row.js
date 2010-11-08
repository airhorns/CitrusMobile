(function() {
  var PaypalActionTableViewRow;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  PaypalActionTableViewRow = function() {
    return Citrus.ActionRows.ActionTableViewRow.apply(this, arguments);
  };
  __extends(PaypalActionTableViewRow, Citrus.ActionRows.ActionTableViewRow);
  PaypalActionTableViewRow.prototype.type = "PaypalActionTableViewRow";
  PaypalActionTableViewRow.prototype.displayPhoto = function() {
    return true;
  };
  PaypalActionTableViewRow.prototype.displayButton = function() {
    return (this.button = Ti.Paypal.createPaypalButton({
      width: 294,
      height: 40,
      appId: "APP-80W284485P519543T",
      buttonStyle: Ti.Paypal.BUTTON_294x43,
      paypalEnvironment: Ti.Paypal.PAYPAL_ENV_SANDBOX,
      feePaidByReceiver: false,
      transactionType: Ti.Paypal.PAYMENT_TYPE_DONATION,
      enableShipping: false,
      payment: {
        amount: this.action.amount,
        tax: 0.00,
        shipping: 0.00,
        currency: "USD",
        recipient: this.action.recipient,
        itemDescription: "Donation",
        merchantName: this.action.merchantName
      }
    }));
  };
  Citrus.registerActionViewRow(PaypalActionTableViewRow);
}).call(this);
