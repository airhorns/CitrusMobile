class DataCollectionWindow extends Citrus.GenericWindow
	constructor: (controller) ->
		super

		@win = Ti.UI.createWindow
			title:@title
			backgroundColor:'#fff'
			backButtonTitle: @backButtonTitle || "Cancel"

		[@fields, @rows] = [[], []]
		
		for name, opts of @fieldsToCollect
			row = this.getFieldRowTemplate()
			row.add this.getFieldLabelTemplate(name.capitalize())
			field = this.getFieldTemplate(_.extend((opts || {}), {name: name}))
			row.add field
			@fields.push field
			@rows.push row
		
		@table = Titanium.UI.createTableView
			data: @rows
			style: Titanium.UI.iPhone.TableViewStyle.GROUPED
			footerTitle: @footerTitle || ""

		@win.add(@table)

	getFieldRowTemplate: () ->
		Titanium.UI.createTableViewRow
			height: 50
			className: String(Math.random()*10)
			selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE

	getFieldLabelTemplate: (text) ->
		Titanium.UI.createLabel
			font:
				fontSize: 16
				fontWeight: 'bold'
			text: text
			left: 10

	getFieldTemplate: (opts) ->
		opts = _.extend(
			height: 35
			top: 8
			left: 100
			width: 195
			color:'#336699'
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
		, opts)
		Titanium.UI.createTextField opts

	data: () ->
		_.inject @fields, (memo, f) ->
			memo[f.name] = f.value
			memo
		, {}

Citrus.DataCollectionWindow = DataCollectionWindow
