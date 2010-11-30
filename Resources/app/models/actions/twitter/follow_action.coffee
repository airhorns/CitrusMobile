class FollowAction extends Citrus.TwitterAction
	@declares: ["followeeId"]

	type: "TwitterFollowAction"
	buttonText: "Follow"

	action: (account, success, failure) ->
		account.api.addFriend(@followeeId, success, (xhr, status, error) ->
			if xhr?
				d xhr.responseText
				if xhr.responseText.match(/already on your list/)
					alert(account.screenName + " is already following this user!")
					return success({})
			try
				msg = JSON.parse xhr.responseText
			catch e
				return failure(error)

			if msg? && msg.error?
				failure(null, null, {alertText: msg.error})
			else
				failure(error)
		)

Citrus.Actions.Twitter.FollowAction = FollowAction
