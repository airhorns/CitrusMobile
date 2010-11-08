class AccountlessAction extends Citrus.Action
	requiresAccount: () ->
		return false

Citrus.AccountlessAction = AccountlessAction
