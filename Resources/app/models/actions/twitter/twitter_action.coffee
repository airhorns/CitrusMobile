class TwitterAction extends Citrus.AccountBasedAction
	@declares: []
	type: "TwitterAction"
	buttonText: "TwitterAction"
	accountType: "TwitterAccount"
	tableViewRow: "AccountActionTableViewRow"
	
	readyToRun: (account) ->
		unless account.isAuthorized()
			Ti.API.debug("Trying to run action on non authorized account!")
			return false
		else
			return true

		
Citrus.TwitterAction = TwitterAction

Ti.include("/app/models/actions/twitter/follow_action.js")
Ti.include("/app/models/actions/twitter/retweet_action.js")
Ti.include("/app/models/actions/twitter/status_update_action.js")
