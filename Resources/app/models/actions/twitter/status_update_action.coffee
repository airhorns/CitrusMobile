class StatusUpdateAction extends Citrus.TwitterAction
	type: "TwitterStatusUpdateAction"
	buttonText: "Tweet"
	@declares: ["text", "in_reply_to_id"]

	action: (account, success, failure) ->
		account.api.update(@text, null, @in_reply_to_id, success, failure)

	
Citrus.Actions.Twitter.StatusUpdateAction = StatusUpdateAction
