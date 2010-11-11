class FacebookAction extends Citrus.AccountBasedAction
	@declares: []
	type: "FacebookAction"
	buttonText: "FacebookAction"
	accountType: "FacebookAccount"
	tableViewRow: "FacebookActionTableViewRow"
		
Citrus.FacebookAction = FacebookAction

Ti.include("/app/models/actions/facebook/publish_stream_action.js")
