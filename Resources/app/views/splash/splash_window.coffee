Ti.include("/app/views/splash/splash_info_table_view_row.js")
Ti.include("/app/views/splash/actions/action_table_view_row.js")
Ti.include("/app/views/splash/actions/twitter_action_table_view_row.js")
Ti.include("/app/views/splash/actions/paypal_action_table_view_row.js")

class SplashWindow extends Citrus.GenericWindow
	# Sets up the loading indicator
	constructor: (controller) ->
		super
		@win = Ti.UI.createWindow({title: "Scan Results",backgroundColor:'#fff'})

		@loadingIndicator = Titanium.UI.createActivityIndicator {
			# style: Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN
			font: {
				fontFamily: 'Helvetica Neue'
				fontSize: 20
				fontWeight: 'bold' }
			color: '#000'
			message: 'Loading Scan Results ...'
			top: 100
		}
		@win.add(@loadingIndicator)

	# Once a splash has been successfully displayed, this displays it
	displaySplash: (splash) ->
		Ti.API.debug("Displaying splash \""+splash.name+"\", tid:"+splash.tid)
		this.hideError()

		@splash = splash
		@win.remove(@table) if @table?
		rows = this.getActionRows()
		rows.unshift this.getInfoRow()
		d(rows)
		
		@table = Titanium.UI.createTableView({
			data: rows
			editable: false
			allowsSelection: false
		})
		this.hideLoading()
		@win.add(@table)
		d("Table added")

	# If a splash couldn't be fetched, this displays the notification and an optional retry button
	displayError: (msg, retry, callback) ->
		this.hideLoading()
		unless @errorLabel?
			@errorLabel = Ti.UI.createLabel {
				color:'#000'
				font:{fontSize:20, fontWeight:'bold'}
				top:100
				height:'auto'
				width:300
			}
			@win.add @errorLabel
		
		@errorLabel.text = msg
		@errorLabel.show()
		if retry
			unless @retryButton?
				@retryButton = Titanium.UI.createButton {
					title: "Retry"
					color:'#fff'
					backgroundImage:'images/buttons/BUTT_grn_off.png'
					backgroundSelectedImage:'images/buttons/BUTT_grn_on.png'
					backgroundDisabledImage: 'images/buttons/BUTT_drk_off.png'
					font:{fontSize:20,fontWeight:'bold',fontFamily:'Helvetica Neue'},
					top: 200
					width: 301
					height:57
				}
				@retryButton.addEventListener "click", (e) ->
					callback(e)
				@win.add @retryButton

			@retryButton.show()
	# Displays non Citrus decoded data as a simple qr code scanner.
	displayDecodedData: (data) ->
		this.hideLoading()
		unless @noticeLabel?
			@noticeLabel = Ti.UI.createLabel {
				color:'#000'
				font:{fontSize:16, fontWeight:'bold'}
				top:50
				height:'auto'
				width:300
				text: "Warning: this code doesn't seem to be a Citrus enabled code! Here's the data that was in it:"
			}
			@win.add(@noticeLabel)

		unless @dataLabel?
			@dataLabel = Ti.UI.createLabel {
				color:'#000'
				font:{fontSize:20, fontWeight:'bold'}
				top:200
				height:'auto'
				width:300
				text: data
			}
			@win.add(@dataLabel)
		
		@noticeLabel.show()
		@dataLabel.show()
		

	# Hides the error label and retry button.
	hideError: () ->
		@win.remove @errorLabel if @errorLabel?
		@win.remove @noticeLabel if @noticeLabel?
		@win.remove @dataLabel if @dataLabel?
		@win.remove @goButton if @goButton?
		@win.remove @retryButton if @retryButton?


	getInfoRow: () ->
		row = new Citrus.SplashInfoTableViewRow(@splash)
		return row.row

	# Gets all the TableViewRow objects corresponding to the splash's actions.
	getActionRows: () ->
		rows = for action in @splash.actions
			takeable = @controller.isActionTakeable(action)
			callback = @controller.takeActionFromRow
			klass = Citrus.ActionRows[action.tableViewRow]
			if klass?
				row = new klass(action, takeable, callback)
			else
				Ti.API.debug("Warning: couldn't find table view row class "+action.tableViewRow+". Instantiating generic.")
				row = new Citrus.ActionRows.ActionTableViewRow(action, takeable, callback)

			row.row
		rows

	showLoading: () ->
		d("Showing loading indicator")
		@loadingIndicator.show()

	hideLoading: () ->
		d("Hiding loading indicator")
		# @loadingIndicator.hide()

Citrus.SplashWindow = SplashWindow
