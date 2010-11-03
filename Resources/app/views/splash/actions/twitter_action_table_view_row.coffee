class TwitterActionTableViewRow extends Citrus.ActionRows.ActionTableViewRow
	type: "TwitterActionTableViewRow"
	icon: ->
		"images/account_icons/TwitterAccount_32.png"
	buttonText: ->
		@action.buttonText

Citrus.registerActionViewRow TwitterActionTableViewRow