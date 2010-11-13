class FacebookActionTableViewRow extends Citrus.ActionRows.ActionTableViewRow
	type: "FacebookActionTableViewRow"

	buttonText: ->
		@action.buttonText

Citrus.registerActionViewRow FacebookActionTableViewRow
