class VisitLinkAction extends Citrus.PlatformAction
	@declares: ["url"]

	type: "PlatformVisitLinkAction"
	buttonText: "Safari"
	iconName: "go"

	action: (success, failure) ->
		Titanium.Platform.openURL(@url)

Citrus.Actions.Platform.VisitLinkAction = VisitLinkAction
