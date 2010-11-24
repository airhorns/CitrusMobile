class MailchimpAction extends Citrus.AccountBasedAction
	@declares: ["apikey"]
	type: "MailchimpAction"
	buttonText: "MailchimpAction"
	accountType: "EmailAccount"
	tableViewRow: "AccountActionTableViewRow"
	
	baseURL: "http://us2.api.mailchimp.com/1.3/"

	readyToRun: (account) ->
		return true
	

	
Citrus.MailchimpAction = MailchimpAction

Ti.include("/app/models/actions/mailchimp/subscribe_action.js")
