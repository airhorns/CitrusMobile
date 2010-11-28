Ti.include('/app/views/code_history/code_history_table_view_window.js')
Ti.include('/app/models/splash_store.js')

class CodeHistoryController extends Citrus.Controller
	scans: []
	page: 0

	constructor: () ->
		d "Code history controller being created"
		@window = new Citrus.CodeHistoryTableViewWindow(this)
		@window.win.addEventListener("focus", (e) => this.focused(e))

	focused: (e) ->
		d "Code history being shown."
		if @scans.length == 0
			this.showNextPage()
	
	showNextPage: () ->
		@window.showLoading()
		@window.hideLoading()
		# Get scans for page and add to scans array
		# Add new scans to window
		
Citrus.CodeHistoryController = CodeHistoryController
