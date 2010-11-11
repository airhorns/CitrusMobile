class FacebookActionTableViewRow extends Citrus.ActionRows.ActionTableViewRow
	type: "FacebookActionTableViewRow"
	icon: ->
		"images/account_icons/FacebookAccount_32.png"

	buttonText: ->
		@action.buttonText

Citrus.registerActionViewRow FacebookActionTableViewRow
