class CodeReaderWindow extends Citrus.PlaceholderWindow
	constructor: (controller, theTitle, theText) ->
		super
		@win.addEventListener("focus", (e) => @controller.focused(e))

Citrus.CodeReaderWindow = CodeReaderWindow