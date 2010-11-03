class FollowAction extends Citrus.TwitterAction
	@declares: ["followee_id"]

	type: "TwitterFollowAction"
	buttonText: "Follow"

	action: (account, success, failure) ->
		account.api.addFriend(@followee_id, success, failure)
	
	actionName: () ->
		"Follow "+@followee_id

Citrus.Actions.Twitter.Follow = FollowAction
