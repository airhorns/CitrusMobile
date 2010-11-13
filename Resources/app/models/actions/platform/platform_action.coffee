class PlatformAction extends Citrus.AccountlessAction
	@declares: []
	type: "PlatformAction"
	buttonText: "PlatformAction"
	tableViewRow: "PlatformActionTableViewRow"

	readyToRun: () ->
		return true

Citrus.PlatformAction = PlatformAction

Ti.include("/app/models/actions/platform/call_action.js")
Ti.include("/app/models/actions/platform/visit_link_action.js")

