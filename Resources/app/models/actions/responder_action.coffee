# Responder action. Takes the callbacks in a setup method and then 
# allows the success and failure callbacks to be called from somewhere 
# else. Pretty much only useful for the Paypal integration where we 
# don't get control over the button and its callbacks, only the
# succeed/failure callbacks from the actual payment itself.
class ResponderAction extends Citrus.Action
	requiresAccount: () ->
		return false
	
	requiresResponders: () ->
		return true

	respondWith: (success, failure) ->
		this.success = _.bind(success, this)
		this.failure = _.bind(failure, this)

	action: () ->
		throw new Exception("Can't call action on a responder action, call the callbacks!")

Citrus.ResponderAction = ResponderAction

