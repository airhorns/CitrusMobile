class TwitterAccountTableViewRow extends Citrus.AccountTableViewRow
	constructor: (account) ->
		super

		screenName = Ti.UI.createLabel {
			color:'#000'
			text: "@" + @account.screenName
			font:{fontSize:20, fontWeight:'bold'}
			top:5
			left:70
			height:'auto'
			minimumFontSize: 13
			width:240
		}
		@row.add(screenName)

		if @account.name?
			realName = Ti.UI.createLabel {
				color:'#333'
				text: @account.name
				font:{fontSize:15}
				top:30
				left:70
				height:'auto'
				width:'auto'
			}
			@row.add(realName)

Citrus.TwitterAccountTableViewRow = TwitterAccountTableViewRow
