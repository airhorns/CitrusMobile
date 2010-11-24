# Actions namespace
Citrus.Actions = {
	Platform: {}
	Twitter: {}
	Paypal: {}
	Facebook: {}
	LinkedIn: {}
	Foursquare: {}
	Mailchimp: {}
}

class Action extends Citrus.Object
	@declares: []
	@alwaysDeclared: ["actionText"]
	valid: false
	icon: Citrus.getIconPath("generic")
	actionText: ""

	constructor: (attributes) ->
		if (_.keys(attributes).length == (this.constructor.declares.length + Citrus.Action.alwaysDeclared.length))
			@valid = true
			for k, v of attributes
				k = k.camelize(true) # Camel case the underscored lowercase Rails text
				if _.isFunction(this[k])
					@valid = (@valid && this[k].call(v))
				else
					this[k] = v

		else
			Ti.API.debug("Wrong amount of arguments passed to action constructor!")
			@valid = false

	readyToRun: () ->
		return true

	run: (success, failure) ->
		if this.readyToRun()
			this.action(success, failure)
		else
			this.failure(null, "Not ready to run!")

	action: (success, failure) ->
		success()

	button: () ->
		return true
	requiresAccount:() ->
		return false
	requiresResponders:() ->
		return false

Citrus.Action = Action

Ti.include("/app/models/actions/account_based_action.js")
Ti.include("/app/models/actions/accountless_action.js")
Ti.include("/app/models/actions/responder_action.js")

# Defines the constructor for new polymorphic actions
_.extend Citrus.Actions, {
	newFromJSON: (passed_attributes) ->
		attributes = _.clone((passed_attributes || {}))
		type = attributes['_type']
		delete attributes['id']
		if type
			delete attributes['_type']
			types = type.split("::")

			# Find the action object by looping over the namespaces.
			scope = Citrus
			for namespace in types
				unless _.isUndefined(scope[namespace])
					scope = scope[namespace]
				else
					Ti.API.error("Unrecognized action namespace/type "+ type + ". Looked at Citrus."+types.join("."))
					return false

			# If the action was succesfully found, initialize it and return it.
			if _.isFunction(scope)
				action = new scope(attributes)
				if action.valid
					return action
				else
					Ti.API.error("Invalid action generated from attributes.")
					return false
			else
				Ti.API.error("Unrecognized action scope found at Citrus."+types.join(".")+", it wasn't a function!")
				return false
		else
			Ti.API.error("Couldn't build action because no type attribute was provided.")
			return false
}

Ti.include("/app/models/actions/platform/platform_action.js")
Ti.include("/app/models/actions/twitter/twitter_action.js")
Ti.include("/app/models/actions/foursquare/foursquare_action.js")
Ti.include("/app/models/actions/paypal/paypal_action.js")
Ti.include("/app/models/actions/facebook/facebook_action.js")
Ti.include("/app/models/actions/mailchimp/mailchimp_action.js")
