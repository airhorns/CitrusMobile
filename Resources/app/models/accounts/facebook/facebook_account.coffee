Ti.include("/app/controllers/facebook_authorization_controller.js")

class FacebookAccount extends Citrus.Account
	type: "FacebookAccount"
	constructor: () ->
		# Hack for only one facebook account while the titanium module is in use.
		if _.any(root.accountStore, (a) -> a.type == "FacebookAccount")
			d("Trying to create a second Facebook account. No can do at the moment.")
			alert("Multiple Facebook accounts aren't supported right now, sorry!")
			return null
		else
			return super

	isAuthorized: () ->
		Ti.Facebook.isLoggedIn()

	authorize: (success) ->
		d("Starting facebook authorization")
		loggedIn = (session) ->
			d("Successfully logged in to facebook")
			d(session)
		errorLoggingIn = (e) ->
			er("Error logging in with facebook account!")
			er(e)
			er(Titanium.Facebook.session)
			er(Titanium.Facebook.isLoggedIn())
			Titanium.Facebook.publishStream("Test status! Woooohooo", null, null, (e) ->
				d("Trying to publish stream")
				d(e)
			)

		controller = new Citrus.FacebookAuthorizationController(loggedIn, errorLoggingIn)

Citrus.registerAccount FacebookAccount
