Ti.include('/app/controllers/email_collection_controller.js')

class EmailAccount extends Citrus.Account
	type: "EmailAccount"
	persistableAttributes: ["email"]
	synch: ->
		this.fireEvent("state:updating")
		this.fireEvent("state:ready")

	isAuthorized: ->
		true
	authorize: () ->
		controller = {}
		gotData = (data) =>
			d(data)
			@email = data.email
			this.completeAuthorization()
			controller.destroy()
			
		canceled = (e) =>
			this.fireEvent("authorization:error", e)
			this.fireEvent("authorization:complete")

		controller = new Citrus.EmailCollectionController(gotData, canceled)

Citrus.registerAccount EmailAccount
