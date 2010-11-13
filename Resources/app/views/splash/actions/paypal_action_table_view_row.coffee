Ti.Paypal = require('ti.paypal')

class PaypalActionTableViewRow extends Citrus.ActionRows.ActionTableViewRow
	type: "PaypalActionTableViewRow"
	constructor: () ->
		super
	
	textOffset: () ->
		return 5
	buttonWidth: () ->
		return 152
	displayPhoto: ->
		return true
	
	displayButton: ->
		opts = {
			height: 33
			width: 152
			top: 4
			right: 4
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
		
		@button = Ti.Paypal.createPaypalButton opts
		@button.addEventListener "paymentSuccess", @action.success
		@button.addEventListener "paymentError", (e) -> @action.error(null, null, e)
		@button.addEventListener "paymentCancled", (e) -> d("Payment canceled.")
		
		# THIS IS CRITICAL TO GETTING THE BUTTON TO REGISTER EVENTS
		# Titanium will kill me, without a doubt. Since the PayPal button is actually
		# a view, the button inside it won't register the click event unless
		# a) height and width arent auto
		# b) the intermediate view has it's own listener for events so it can be passed
		# down the chain. For more information, see http://developer.appcelerator.com/question/27291/button-inside-a-view---inside-a-tableviewrow
		@button.addEventListener "click", (e) ->
		
		@row.add(@button)

Citrus.registerActionViewRow PaypalActionTableViewRow
