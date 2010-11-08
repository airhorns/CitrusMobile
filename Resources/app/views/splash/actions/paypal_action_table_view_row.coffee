class PaypalActionTableViewRow extends Citrus.ActionRows.ActionTableViewRow
	type: "PaypalActionTableViewRow"
	displayPhoto: ->
		return true
	displayButton: ->
		@button = Ti.Paypal.createPaypalButton {
			width: 294
			height: 40
			appId: "APP-80W284485P519543T"
			buttonStyle: Ti.Paypal.BUTTON_294x43
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

Citrus.registerActionViewRow PaypalActionTableViewRow
