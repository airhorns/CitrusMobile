class XAuthorizationWindow extends Citrus.DataCollectionWindow
	fieldsToCollect:
		username: {}
		password:
			passwordMask: true
	title: "XAuth Window"
	constructor: (controller) ->
		super
		# Add new account button
		@saveButton = Titanium.UI.createButton
			title: "Save"

		@saveButton.addEventListener 'click', (e) =>
			for f in @fields
				f.blur()
			this.fireEvent("info:collected", e)

		@win.rightNavButton = @saveButton

Citrus.XAuthorizationWindow = XAuthorizationWindow
