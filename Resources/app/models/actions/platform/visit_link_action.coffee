class VisitLinkAction extends Citrus.PlatformAction
	@declares: ["url"]

	type: "PlatformVisitLinkAction"
	buttonText: "Safari"
	iconName: "safari"

	action: (success, failure) ->
		Titanium.Platform.openURL(@url)

Citrus.Actions.Platform.VisitLinkAction = VisitLinkAction
