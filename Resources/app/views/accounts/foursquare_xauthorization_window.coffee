class FoursquareXAuthorizationWindow extends Citrus.XAuthorizationWindow
	title: "Add Foursquare Account"
	fieldsToCollect:
		email: {}
		password:
			passwordMask: true
	footerTitle: "Please enter your Foursquare account information above."
Citrus.FoursquareXAuthorizationWindow = FoursquareXAuthorizationWindow
