class SplashInfoHeaderView extends Citrus.Object
	constructor: (splash) ->
		@view = Titanium.UI.createView
			height: 65
			top: 0


		@splash = splash
		@view.object = this
		
		if splash.photo?
			text_offset = 74
			photo = Ti.UI.createImageView
				image: splash.photo
				width: 60
				height: 'auto'
				top: 6
				left: 7
				borderColor: 'black'
				borderRadius: 5
				borderWidth: 1

			@view.add(photo)
		else
			text_offset = 5
		
		title = Ti.UI.createLabel
			color:'#000'
			text: splash.name
			font:
				fontSize:30
				fontWeight:'bold'
			minimumFontSize: 16
			top:4
			left:text_offset
			height: 32
			width: (320 - text_offset - 4)
			shadowColor: '#999'
			shadowOffset:
				x: 1
				y: 1
		
		
		@view.add(title)
		
		description = Ti.UI.createLabel
			color:'#000'
			text: splash.text
			font:
				fontSize:20
				fontWeight:'bold'
			minimumFontSize: 12
			top:40
			left: text_offset
			height: 22
			width: (320 - text_offset - 4)
		
		@view.add(description)

Citrus.SplashInfoHeaderView = SplashInfoHeaderView
	
