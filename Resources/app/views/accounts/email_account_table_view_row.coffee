class EmailAccountTableViewRow extends Citrus.AccountTableViewRow
	constructor: (account) ->
		super

		email = Ti.UI.createLabel {
			color:'#000'
			text: @account.email
			font:{fontSize:20, fontWeight:'bold'}
			top:3
			left:70
			height: 'auto'
			minimumFontSize: 13
			width:240
		}
		@row.add(email)

Citrus.EmailAccountTableViewRow = EmailAccountTableViewRow
