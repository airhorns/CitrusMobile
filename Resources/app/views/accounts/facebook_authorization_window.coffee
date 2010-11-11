class FacebookAuthorizationWindow extends Citrus.GenericWindow
	constructor: (controller) ->
		super
		@win = Ti.UI.createWindow {
			title: "Add Account"
			backgroundColor: "#FFFFFF"
		}
		
		@fbButton = Titanium.Facebook.createLoginButton({
			style:'wide'
			apikey: Citrus.Config.FACEBOOK_API_KEY
			secret: Citrus.Config.FACEBOOK_APP_SECRET
			# sessionProxy:'http://api.appcelerator.net/p/fbconnect/'
			top:130
			height:30
			width:300
		})
		
		@label = Titanium.UI.createLabel {
			color:'#000'
			font:{fontSize:16, fontWeight:'bold'}
			top:50
			height:'auto'
			width:300
			text: "Click the Connect with Facebook button below to add your Facebook account to Citrus."
		}

		@win.add(@label)
		@win.add(@fbButton)
	
	destroyAuthorizeUI: () ->
		@win.close({animated: false})

Citrus.FacebookAuthorizationWindow = FacebookAuthorizationWindow
