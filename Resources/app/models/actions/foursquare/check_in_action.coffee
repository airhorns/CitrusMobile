class CheckInAction extends Citrus.FoursquareAction
	@declares: ["venueId"]
	type: "FoursquareCheckInAction"
	buttonText: "Check In"
	
	action: (account, success, failure) ->
		account.api.checkIn(@venueId, (e) ->
			success(e)
		, (e) ->
			failure(e)
		)
		
Citrus.Actions.Foursquare.CheckInAction = CheckInAction
