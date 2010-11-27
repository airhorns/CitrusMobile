class CodeHistoryTableViewWindow extends Citrus.GenericWindow
	constructor: () ->
		super
		@loading = new Citrus.ModalLoadingView("Loading info...", this)
		@win = Titanium.UI.createWindow
			title:"Code History"
			backgroundColor:'white'
				
		@table = Titanium.UI.createTableView
			data: []
			rowHeight: 60
			editable: true
		
		@win.add @table
	
	showLoading: () ->
		@loading.show(@win)
	hideLoading: () ->
		@loading.hide(@win)

Citrus.CodeHistoryTableViewWindow = CodeHistoryTableViewWindow
