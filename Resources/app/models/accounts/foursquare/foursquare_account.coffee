Ti.include('/app/views/accounts/foursquare_xauthorization_window.js')
Ti.include('/vendor/foursquare.js')

class FoursquareAccount extends Citrus.Account
	type: "FoursquareAccount"
	persistableAttributes: ["location", "name", "accessToken", "accessTokenSecret"]
	constructor: (params) ->
		super(params)
		@consumer = new SpazOAuth
			'service' : 'foursquare'

		@api = new Citrus.FoursquareAPI()
		@api.consumer = @consumer
		@consumer.accessToken = this.accessToken
		@consumer.accessTokenSecret = this.accessTokenSecret

	synch: ->
		this.fireEvent("state:updating")
		if ! this.isAuthorized()
			Ti.API.debug("Trying to synch Twitter Account but account is not authorized!")
			this.fireEvent("state:error")
			return false
		@api.getDetails(null, (data) =>
			this.name = (data.user?.firstname + " " + data.user?.lastname) || data.user?.email
			unless this.name
				er("Not enough information returned from foursquare to make an account")
				this.fireEvent("state:error")
				return false
			this.location = data.user?.checkin?.venue?.name
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

	authorize: () ->
		d("Starting XAuth Foursquare authorization")
		controller = {}
		gotData = (data) =>
			data =
				username: data.email
				password: data.password
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

		controller = new Citrus.XAuthorizationController(gotData, canceled, Citrus.FoursquareXAuthorizationWindow)
	
	completeAuthorization: () ->
		# Set up API to properly consume
		this.accessToken = @consumer.accessToken
		this.accessTokenSecret = @consumer.accessTokenSecret
		@api.consumer = @consumer
		super()

Citrus.registerAccount FoursquareAccount
