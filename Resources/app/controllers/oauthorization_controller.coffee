Ti.include("/app/views/accounts/authorization_web_view_window.js");
class OAuthorizationController extends Citrus.Controller
	constructor: (onload, onerror)->
		@window = new Citrus.AuthorizationWebViewWindow()
		@window.addEventListener("load", onload)
		@window.addEventListener("destroy", onerror)
	
	loadURL: (url) ->
		@window.loadURL(url)
		
	destroy: ->
		@window.destroyAuthorizeUI()

Citrus.OAuthorizationController = OAuthorizationController