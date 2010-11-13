class AccountActionTableViewRow extends Citrus.ActionRows.ActionTableViewRow
	type: "AccountActionTableViewRow"
	buttonText: ->
		@action.buttonText

Citrus.registerActionViewRow AccountActionTableViewRow
