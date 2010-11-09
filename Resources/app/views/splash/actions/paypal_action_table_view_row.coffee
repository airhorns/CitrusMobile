Ti.Paypal = require('ti.paypal')

class PaypalActionTableViewRow extends Citrus.ActionRows.ActionTableViewRow
	type: "PaypalActionTableViewRow"
	textOffset: () ->
		return 5

	displayPhoto: ->
		return true
	
	displayButton: ->
		opts = {
			width: "auto"
			height: "auto"
			top: 4
			right: 162
			appId: "APP-80W284485P519543T"
			buttonStyle: Ti.Paypal.BUTTON_152x33
			paypalEnvironment: Ti.Paypal.PAYPAL_ENV_SANDBOX
			feePaidByReceiver: false
			transactionType: Ti.Paypal.PAYMENT_TYPE_DONATION
			enableShipping: false
			payment: {
        amount: @action.amount
        tax: 0.00
        shipping: 0.00
        currency: "USD"
        recipient: @action.recipient
        itemDescription: "Donation"
        merchantName: @action.merchantName
			}
		}
		d(opts)
		@button = Ti.Paypal.createPaypalButton opts
		d(@button)
		@button.addEventListener "paymentSuccess", @action.success
		@button.addEventListener "paymentError", (e) -> @action.error(null, null, e)
		@button.addEventListener "paymentCancled", (e) -> d("Payment canceled.")
		@row.add(@button)

Citrus.registerActionViewRow PaypalActionTableViewRow
