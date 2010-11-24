class EmailCollectionWindow extends Citrus.DataCollectionWindow
	fieldsToCollect:
		email: {}
	title: "Add Email"
	footerTitle: "Please enter an email address in the fields above."
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

Citrus.EmailCollectionWindow = EmailCollectionWindow
