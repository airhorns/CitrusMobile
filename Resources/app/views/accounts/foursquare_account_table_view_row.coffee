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
			width:'auto'
		}
		@row.add(name)

		if @account.location?
			location = Ti.UI.createLabel {
				color:'#333'
				text: @account.location
				# font:{fontSize:15, fontWeight:'bold'}
				top:30
				left:70
				height: 20
				width: 200
			}
			@row.add(location)

Citrus.FoursquareAccountTableViewRow = FoursquareAccountTableViewRow
