Ti.include('/app/views/accounts/twitter_xauthorization_window.js')
Ti.include('/vendor/spazcore/libs/spaztwit.js')

class TwitterAccount extends Citrus.Account
	type: "TwitterAccount"
	persistableAttributes: ["screenName", "name", "accessToken", "accessTokenSecret"]
	constructor: (params) ->
		super(params)
		@consumer = new SpazOAuth
			'service' : 'twitter'

		@api = new SpazTwit()

		@consumer.accessToken = this.accessToken
		@consumer.accessTokenSecret = this.accessTokenSecret
		if @consumer.isAuthorized()
			@api.setCredentials(@consumer)

	synch: ->
		this.fireEvent("state:updating")
		if ! this.isAuthorized()
			Ti.API.debug("Trying to synch Twitter Account but account is not authorized!")
			this.fireEvent("state:error")
			return false
		@api.verifyCredentials((e) =>
			this.name = @api.me.name
			this.screenName = @api.me.screen_name
			this.fireEvent("state:ready")
			this.markAsSynched()
		, (e, status, error) =>
			Ti.API.error("Couldn't retrive account information! Status: "+status)
			Ti.API.error("Status: "+e.status)
			Ti.API.error("Message: "+error.message)
			Ti.API.error("Response: "+e.responseText)
			this.fireEvent("state:error")
		)

	isAuthorized: ->
		return @consumer.isAuthorized()

	authorize: ->
		super
		if Citrus.Config.TWITTER_XAUTH
			this.xAuthAuthorize()
		else
			this.oAuthAuthorize()

	xAuthAuthorize: () ->
		d("Starting XAuth Twitter authorization")
		controller = {}
		gotData = (data) =>
			controller.showLoading()
			@consumer.getXauthTokens _.extend(data, {
				onSuccess: (e) =>
					d "Sucess getting xauth tokens"
					controller.hideLoading()
					this.completeAuthorization()
					controller.destroy()
				onError: (xhr, status, e) =>
					er("Unable to get XAuth tokens with supplied data.")
					d status
					d xhr.status
					d xhr.responseText
					d e
					if xhr.status == 401
						controller.showCredentialsError()
					else
						controller.showCommunicationError()
					Ti.API.error("Error finding pin in authorize UI. Canceling process.")
					this.fireEvent("authorization:error", e)
					this.fireEvent("authorization:complete")
			})

		canceled = (e) =>
			this.fireEvent("authorization:error", e)
			this.fireEvent("authorization:complete")

		controller = new Citrus.XAuthorizationController(gotData, canceled, Citrus.TwitterXAuthorizationWindow)
		
	oAuthAuthorize: () ->
		controller = {}
		d("Starting OAuth Twitter Authorization")

		this.addEventListener "authorization:error", (e) =>
			controller.destroy() if controller.destroy?

		d("Setting up callbacks")
		errorFindingPin = (e) =>
			Ti.API.error("Error finding pin in authorize UI. Canceling process.")
			this.fireEvent("authorization:error", e)
			this.fireEvent("authorization:complete")

		findPin = (e) =>
			try
				xmlDocument = Ti.XML.parseString(e.source.html)
				nodeList = xmlDocument.getElementsByTagName('div')
				i = 0
				while i < nodeList.length
						node = nodeList.item(i)
						id = node.attributes.getNamedItem('id')
						if (id && id.nodeValue == 'oauth_pin')
								@pin = node.text

								setTimeout((=> this._getAccessToken(@pin)), 100)
								id = null
								node = null
								controller.destroy()
								break
						i++
				nodeList = null
				xmlDocument = null
			catch e
				Ti.API.error("Error parsing Authorize UI XML and finding PIN.")
				errorFindingPin(e)

			Ti.API.debug("Pin not found in loaded XML")

		# Create controller to manage the PIN getting web view
		d("Creating controller")
		controller = new Citrus.OAuthorizationController(findPin, errorFindingPin)
		
		tokenSuccess = (token) =>
			url = OAuth.addToURL(@consumer.getService().userAuthorizationUrl, {oauth_token : @consumer.requestToken})
			Ti.API.debug("Sending user to url to authorize: "+url)
			controller.loadURL(url)
		
		tokenError = (xhr, status, error) =>
			e("Couldn't get request token!", status, error, xhr.status)
			this.fireEvent("authorization:error")
		
		@consumer.getRequestTokenAsync(tokenSuccess, tokenError)

	_getAccessToken: (accessPin) ->
		Ti.API.debug("Trying to complete authorization with pin: "+accessPin)
		if @consumer.requestToken?
			if accessPin?
				if @consumer.getAuthorization(accessPin)
					this.completeAuthorization()
					return true
				else
					msg = "Unable to get authorization from consumer with the provided access PIN."
			else
				msg = "Invalid access PIN"
		else
			msg = "Consumer has no request token!"

		this.fireEvent("authorization:error", {msg: msg, source:this})
		this.fireEvent("authorization:complete")

	completeAuthorization: () ->
		# Set up API to properly consume
		this.accessToken = @consumer.accessToken
		this.accessTokenSecret = @consumer.accessTokenSecret
		@api.setCredentials(@consumer)
		super()

Citrus.registerAccount TwitterAccount
