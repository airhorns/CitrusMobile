Citrus.AccountTypes = []

class Account extends Citrus.PersistedObject
	type: "GenericAccount"
	lastSynched: false
	refreshInterval: 1000*60*3 # 3 hours
	constructor: ->
		super
		@valid = true

	isAuthorized: ->
		false
		
	authorize: () ->
		return true if this.isAuthorized()
		this.fireEvent("authorization:start")
		true
	
	completeAuthorization: () ->
		this.fireEvent("authorization:success")
		this.fireEvent("authorization:complete")
		true
		
Citrus.Account = Account

Citrus.registerAccount = (account_klass) ->
	Citrus.AccountTypes.push account_klass
	Citrus[account_klass::type] = account_klass
	
Ti.include("/app/models/accounts/twitter/twitter_account.js")
Ti.include("/app/models/accounts/facebook/facebook_account.js")
Ti.include("/app/models/accounts/google/google_account.js")
Ti.include("/app/models/accounts/linkedin/linkedin_account.js")
Ti.include("/app/models/accounts/foursquare/foursquare_account.js")
