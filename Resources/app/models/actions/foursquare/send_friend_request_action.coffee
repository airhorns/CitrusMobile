class SendFriendRequestAction extends Citrus.FoursquareAction
	@declares: ["userId"]
	type: "FoursquareSendFriendRequestAction"
	buttonText: "Add"
	
	action: (account, success, failure) ->
		account.api.sendFriendRequest(@userId, (e) ->
			success(e)
		, (e) ->
			failure(e)
		)
		
Citrus.Actions.Foursquare.SendFriendRequestAction = SendFriendRequestAction
