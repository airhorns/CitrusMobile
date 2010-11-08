class AccountBasedAction extends Citrus.Action
	requiresAccount: () ->
		return true

	readyToRun: (account) ->
		return true

	run: (account, success, failure) ->
		if this.readyToRun(account)
			this.action(account, success, failure)
		else
			this.failure(null, "Not ready to run!")

	action: (account, success, failure) ->
		success()

Citrus.AccountBasedAction = AccountBasedAction
