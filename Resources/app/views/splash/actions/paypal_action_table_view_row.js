(function() {
  var PaypalActionTableViewRow;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Ti.Paypal = require('ti.paypal');
  PaypalActionTableViewRow = function() {
    function PaypalActionTableViewRow() {
      PaypalActionTableViewRow.__super__.constructor.apply(this, arguments);
    }
    __extends(PaypalActionTableViewRow, Citrus.ActionRows.ActionTableViewRow);
    PaypalActionTableViewRow.prototype.type = "PaypalActionTableViewRow";
    PaypalActionTableViewRow.prototype.buttonWidth = function() {
      return 68;
    };
    PaypalActionTableViewRow.prototype.displayButton = function() {
      var opts;
      opts = {
        height: 24,
        width: this.buttonWidth(),
        top: 8,
        right: 12,
        appId: "APP-80W284485P519543T",
        buttonStyle: Ti.Paypal.BUTTON_68x24,
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
    PaypalActionTableViewRow.prototype.icon = function() {
      return Citrus.getIconPath("paypal");
    };
    return PaypalActionTableViewRow;
  }();
  Citrus.registerActionViewRow(PaypalActionTableViewRow);
}).call(this);
