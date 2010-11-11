Ti.include("/app/controllers/facebook_authorization_controller.js")

class FacebookAccount extends Citrus.Account
	type: "FacebookAccount"
	persistableAttributes: ["name", "affiliations"]
	constructor: () ->
		super
		# Hack for only one facebook account while the titanium module is in use.
		if root.accountStore? && _.any(root.accountStore.accounts, (a) -> return a.type == "FacebookAccount")
			d("Trying to create a second Facebook account. No can do at the moment.")
			alert("Multiple Facebook accounts aren't supported right now, sorry!")
			@valid = false

	isAuthorized: () ->
		Ti.Facebook.isLoggedIn()

	synch: () =>
		d("Synching facebook account")
		this.fireEvent("state:updating")
		unless this.isAuthorized()
			d("Trying to synch Facebook account but account is not authorized!")
			this.fireEvent("state:error")
			return false
		else
			fql = "SELECT name, affiliations FROM user WHERE uid = me()"
			Titanium.Facebook.query fql, (e) =>
				if e.success && e.data?
					d("Success getting facebook data!")
					@name = e.data[0].name
					@affiliations = _.map(e.data[0].affiliations, (a) -> a.name).join(", ") if e.data[0]?.affiliations?
					this.fireEvent("state:ready")
				else
					er("Error fqling Facebook information.")
					er(e)
					this.fireEvent("state:error")
	
	authorize: () ->
		d("Starting facebook authorization")
		super
		d(Titanium.Facebook.isLoggedIn())
		d(Titanium.Facebook.loggedIn)
		d(Titanium.Facebook.session)
		d(Titanium.Facebook.permissions)
		controller = {}
		
		loggedIn = (session) =>
			d("Successfully logged in to facebook")
			d(session)
			controller.destroy() if controller.destroy?
			this.completeAuthorization()

		errorLoggingIn = (e) =>
			d("Suspected login error. Verifying")
			unless Titanium.Facebook.isLoggedIn()
				er("Error logging in with facebook account!")
				er(e)
				d("Session:")
				d(Titanium.Facebook.session)
				d("Is logged in:")
				d(Titanium.Facebook.isLoggedIn())
				this.fireEvent("authorization:error", e)
			else
				er("False negative on facebook login! Loggin in.")
				loggedIn(Titanium.Facebook.session)

		controller = new Citrus.FacebookAuthorizationController(loggedIn, errorLoggingIn)

Citrus.registerAccount FacebookAccount
