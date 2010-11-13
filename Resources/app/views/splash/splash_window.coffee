Ti.include("/app/views/splash/splash_info_header_view.js")
Ti.include("/app/views/splash/actions/action_table_view_row.js")
Ti.include("/app/views/splash/actions/twitter_action_table_view_row.js")
Ti.include("/app/views/splash/actions/paypal_action_table_view_row.js")
Ti.include("/app/views/splash/actions/facebook_action_table_view_row.js")
Ti.include("/app/views/splash/actions/platform_action_table_view_row.js")

class SplashWindow extends Citrus.GenericWindow
	# Sets up the loading indicator
	constructor: (controller) ->
		super
		@win = Ti.UI.createWindow({title: "Scan Results",backgroundColor:'#fff'})
	
		@loadingWindow = Ti.UI.createWindow {
			modal: true
			opacity: 0.75
			backgroundColor: 'black'
		}

		@loadingIndicator = Ti.UI.createView {
	    backgroundColor: 'black'
  	  opacity: 0.75
   		height: 70
   		width: 70
			left: 125
			top: 280
		}
 
		loadIndicator = Ti.UI.createActivityIndicator {
    	style: Ti.UI.iPhone.ActivityIndicatorStyle.BIG
    	message: 'loading data...'
    	font : 'Arial'
    	color: '#FFF'
		}
 
		@loadingIndicator.add(loadIndicator)
		@loadingWindow.add(@loadingIndicator)
		@loadingShown = false
	# Once a splash has been successfully displayed, this displays it
	displaySplash: (splash) ->
		Ti.API.debug("Displaying splash \""+splash.name+"\", tid:"+splash.tid)
		this.hideError()

		@splash = splash
		@win.remove(@table) if @table?
		rows = this.getActionRows()

		@table = Titanium.UI.createTableView({
			data: rows
			editable: false
			allowsSelection: false
			style: Titanium.UI.iPhone.TableViewStyle.GROUPED
			headerView: this.getHeaderView()
		})

		@win.add(@table)
		this.hideLoading()
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

		unless @dataView?
			@dataView = Ti.UI.createWebView {
				color:'#000'
				top:150
				height:300
				width:300
				html: sc.helpers.makeClickable(data, {autolink: true, screenname: true})
			}
			@win.add(@dataView)

		@noticeLabel.show()
		@dataView.show()
		this.hideLoading()

	# Hides the error label and retry button.
	hideError: () ->
		@win.remove @errorLabel if @errorLabel?
		@win.remove @noticeLabel if @noticeLabel?
		@win.remove @dataView if @dataView?
		@win.remove @goButton if @goButton?
		@win.remove @retryButton if @retryButton?


	getHeaderView: () ->
		view = new Citrus.SplashInfoHeaderView(@splash)
		return view.view

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
		@loadingWindow.open({animated: false}) unless @loadingShown

	hideLoading: () ->
		d("Hiding loading indicator")
		@loadingWindow.close({animated: false}) if @loadingShown

Citrus.SplashWindow = SplashWindow
