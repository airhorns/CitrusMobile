Ti.include("/app/views/accounts/xauthorization_window.js")

class XAuthorizationController extends Citrus.Controller
	constructor: (onload, onerror)->
		@window = new Citrus.XAuthorizationWindow()
	
	loadURL: (url) ->
		@window.loadURL(url)
		
	destroy: ->
		@window.destroyAuthorizeUI()

Citrus.XAuthorizationController = XAuthorizationController

