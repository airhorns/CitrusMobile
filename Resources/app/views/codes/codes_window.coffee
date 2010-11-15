class CodesWindow extends Citrus.PlaceholderWindow
	constructor: () ->
		super
		@loading = new Citrus.ModalLoadingView("Loading info...", this)
		@loading.show(@win)

Citrus.CodesWindow = CodesWindow
