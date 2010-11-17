class FoursquareAction extends Citrus.AccountBasedAction
	@declares: []
	type: "FoursquareAction"
	buttonText: "Check In"
	accountType: "FoursquareAccount"
	tableViewRow: "FoursquareActionTableViewRow"
	
	readyToRun: (account) ->
		unless account.isAuthorized()
			Ti.API.debug("Trying to run action on non authorized account!")
			return false
		else
			return true

		
Citrus.FoursquareAction = FoursquareAction

# Foursquare Actions
Ti.include('/app/models/actions/foursquare/check_in_action.js')
Ti.include('/app/models/actions/foursquare/send_friend_request_action.js')
