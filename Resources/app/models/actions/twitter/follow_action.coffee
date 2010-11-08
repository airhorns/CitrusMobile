class FollowAction extends Citrus.TwitterAction
	@declares: ["followeeId"]

	type: "TwitterFollowAction"
	buttonText: "Follow"

	action: (account, success, failure) ->
		account.api.addFriend(@followeeId, success, failure)

Citrus.Actions.Twitter.FollowAction = FollowAction
