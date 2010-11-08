class SplashInfoTableViewRow extends Citrus.Object
	constructor: (splash) ->
		@row = Titanium.UI.createTableViewRow {
			className: "codeInfoRow"
			height: "auto"
		}

		@splash = splash
		@row.object = this
		
		if splash.photo?
			text_offset = 74
			photo = Ti.UI.createImageView {
				image: splash.photo
				height: 60
				width: 60
				top: 4
				left: 7
			}
			@row.add(photo)
		else
			text_offset = 5
		
		title = Ti.UI.createLabel {
			color:'#000'
			text: splash.name
			font:{fontSize:30, fontWeight:'bold'}
			top:4
			left:text_offset
			height:'auto'
			width:'auto'
		}
		
		@row.add(title)
		
		description = Ti.UI.createLabel {
			color:'#000'
			text: splash.text
			font:{fontSize:20, fontWeight:'bold'}
			top:40
			left: text_offset
			height:'auto'
			width:'auto'
		}
		
		@row.add(description)
		
		# if @account.name?
		#		realName = Ti.UI.createLabel {
		#			color:'#333'
		#			text: @account.name
		#			font:{fontSize:15, fontWeight:'bold'}
		#			top:30
		#			left:70
		#			height:'auto'
		#			width:'auto'
		#		}
		#		@row.add(realName)
	
Citrus.SplashInfoTableViewRow = SplashInfoTableViewRow
	
