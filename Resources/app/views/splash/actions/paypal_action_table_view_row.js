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
    PaypalActionTableViewRow.__super__.constructor.apply(this, arguments);
    return this;
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
      height: 33,
      width: 152,
      top: 4,
      right: 4,
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
    this.button = Ti.Paypal.createPaypalButton(opts);
    this.button.addEventListener("paymentSuccess", this.action.success);
    this.button.addEventListener("paymentError", function(e) {
      return this.action.error(null, null, e);
    });
    this.button.addEventListener("paymentCancled", function(e) {
      return d("Payment canceled.");
    });
    this.button.addEventListener("click", function(e) {});
    return this.row.add(this.button);
  };
  Citrus.registerActionViewRow(PaypalActionTableViewRow);
}).call(this);
