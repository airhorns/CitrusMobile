class DonateAction extends Citrus.PaypalAction
	@declares: ["amount", "recipient", "merchantName"]
	type: "PaypalDonateAction"
	
Citrus.Actions.Paypal.DonateAction = DonateAction
