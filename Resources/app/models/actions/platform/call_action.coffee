class CallAction extends Citrus.PlatformAction
	@declares: ["phoneNumber"]

	type: "PlatformCallAction"
	buttonText: "Call"

	action: (success, failure) ->
		Titanium.Platform.openURL("tel:"+@phoneNumber)

Citrus.Actions.Platform.CallAction = CallAction

