Ti.include("/app/views/accounts/facebook_authorization_window.js")

class FacebookAuthorizationController extends Citrus.Controller
	constructor: (onLoad, onError) ->
		super
		d(Titanium.Facebook.loggedIn)
		if Titanium.Facebook.loggedIn
			onLoad(Titanium.Facebook.session)
			return
		else
			d("Not logged in to facebook yet, showing authorization window.")

		@window = new Citrus.FacebookAuthorizationWindow(this)
		@window.fbButton.addEventListener "login",(e) =>
			if e.success
				onLoad(Titanium.Facebook.session)
			else
				onError(e)

		@window.fbButton.addEventListener "cancel", (e) =>
			onError(e)
		
		root.tabGroup.activeTab.open @window.win, {animated:true}

	destroy: ->
		@window.destroyAuthorizeUI()

Citrus.FacebookAuthorizationController = FacebookAuthorizationController
