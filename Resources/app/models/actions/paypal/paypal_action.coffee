class PaypalAction extends Citrus.RespondingAction
	@declares: []
	type: "PaypalAction"
	buttonText: "PaypalAction"
	tableViewRow: "PaypalActionTableViewRow"

Citrus.PaypalAction = PaypalAction

Ti.include("/app/models/actions/paypal/donate_action.js")
