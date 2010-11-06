class RetweetAction extends Citrus.TwitterAction
	type: "TwitterRetweetAction"
	buttonText: "Retweet"
	@declares: ["status_id"]

	action: (account, success, failure) ->
		account.api.retweet(@status_id, success, failure)

Citrus.Actions.Twitter.Retweet = RetweetAction
