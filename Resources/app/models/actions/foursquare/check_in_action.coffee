class CheckInAction extends Citrus.FoursquareAction
	@declares: ["placeId"]
	type: "FoursquareCheckInAction"
	buttonText: "Check In"
	
	action: (account, success, failure) ->
		success()
		
Citrus.Actions.Foursquare.CheckInAction = CheckInAction
