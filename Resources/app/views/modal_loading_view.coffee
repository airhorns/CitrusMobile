class ModalLoadingView extends Citrus.GenericWindow
	constructor: (text, controller) ->
		super(controller)
	
		@view = Titanium.UI.createView
			height: 480
			width: 320
			top: 0
			left: 0

		bg = Titanium.UI.createView
			height: 480
			width: 320
			top: 0
			left: 0
			opacity: 0.4
			# TODO: background gradient to get the nice blurring
			backgroundColor: 'black'

		box = Titanium.UI.createView
			height: 150
			width: 150
			top: 100
			backgroundColor: 'black'
			opacity: 0.75
			borderRadius: 5

		indicator = Titanium.UI.createActivityIndicator
			top: 130
			left: 140
			width: 40
			height: 40
			style: Titanium.UI.iPhone.ActivityIndicatorStyle.BIG

		message = Titanium.UI.createLabel
			top: 190
			left: 100
			width: 120
			height: 'auto'
			font:
				fontFamily:'Helvetica Neue'
				fontSize:15
				fontWeight:'bold'
			text: text
			textAlign: "center"
			color: 'white'

		@view.add(bg)
		@view.add(box)
		@view.add(indicator)
		@view.add(message)
		indicator.show()

	show: (window) ->
		d("Showing loading indicator")
		window.add(@view)

	hide: (window) ->
		d("Hiding loading indicator")
		window.remove(@view)

Citrus.ModalLoadingView = ModalLoadingView
