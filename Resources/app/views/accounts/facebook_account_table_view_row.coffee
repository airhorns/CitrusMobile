class FacebookAccountTableViewRow extends Citrus.AccountTableViewRow
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

		if @account.affiliations?
			affils = Ti.UI.createLabel {
				color:'#333'
				text: @account.affiliations
				# font:{fontSize:15, fontWeight:'bold'}
				top:30
				left:70
				height: 20
				width: 200
			}
			@row.add(affils)

Citrus.FacebookAccountTableViewRow = FacebookAccountTableViewRow
