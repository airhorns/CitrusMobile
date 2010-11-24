class FoursquareAccountTableViewRow extends Citrus.AccountTableViewRow
	constructor: (account) ->
		super # sets up the row and account instance vars
		
		name = Ti.UI.createLabel {
			color:'#000'
			text: @account.name
			font:{fontSize:20, fontWeight:'bold'}
			top:5
			left:70
			height:'auto'
			minimumFontSize: 13
			width:240
		}
		@row.add(name)

		if @account.location?
			location = Ti.UI.createLabel {
				color:'#333'
				text: @account.location
				font:{fontSize:15, fontWeight:'bold'}
				minmumFontSize: 12
				top:30
				left:70
				height: 20
				width: 200
			}
			@row.add(location)

Citrus.FoursquareAccountTableViewRow = FoursquareAccountTableViewRow
