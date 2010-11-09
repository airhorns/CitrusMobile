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
  Ti.Paypal = require('ti.paypal');
  PaypalActionTableViewRow = function() {
    return Citrus.ActionRows.ActionTableViewRow.apply(this, arguments);
  };
  __extends(PaypalActionTableViewRow, Citrus.ActionRows.ActionTableViewRow);
  PaypalActionTableViewRow.prototype.type = "PaypalActionTableViewRow";
  PaypalActionTableViewRow.prototype.textOffset = function() {
    return 5;
  };
  PaypalActionTableViewRow.prototype.displayPhoto = function() {
    return true;
  };
  PaypalActionTableViewRow.prototype.displayButton = function() {
    var opts;
    opts = {
      width: "auto",
      height: "auto",
      top: 4,
      right: 162,
      appId: "APP-80W284485P519543T",
      buttonStyle: Ti.Paypal.BUTTON_152x33,
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
    };
    d(opts);
    this.button = Ti.Paypal.createPaypalButton(opts);
    d(this.button);
    this.button.addEventListener("paymentSuccess", this.action.success);
    this.button.addEventListener("paymentError", function(e) {
      return this.action.error(null, null, e);
    });
    this.button.addEventListener("paymentCancled", function(e) {
      return d("Payment canceled.");
    });
    return this.row.add(this.button);
  };
  Citrus.registerActionViewRow(PaypalActionTableViewRow);
}).call(this);
