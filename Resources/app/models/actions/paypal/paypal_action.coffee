class PaypalAction extends Citrus.ResponderAction
	@declares: []
	type: "PaypalAction"
	buttonText: "PaypalAction"
	tableViewRow: "PaypalActionTableViewRow"

Citrus.PaypalAction = PaypalAction

Ti.include("/app/models/actions/paypal/donate_action.js")
