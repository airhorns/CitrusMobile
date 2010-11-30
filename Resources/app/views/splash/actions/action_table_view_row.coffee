class ActionTableViewRow extends Citrus.Object
	@InProgress: 1
	@Error: 2
	@Success: 3
	@Ready: 4
	type: "ActionTableViewRow"

	constructor: (action, takeable, clicked) ->
		return false unless action?
		@action = action
		@clicked = clicked
		@takeable = (takeable || false)
		@row =  this.getRowTemplate()
		@state = Citrus.ActionTableViewRow.Ready

		this.displayPhoto()
		this.displayText()
		this.displayButton()

	getRowTemplate: ->
		row =  Titanium.UI.createTableViewRow {
			height: 41
			className: @action.type + @type
			touchEnabled: false
		}
		row.object = this
		return row

	displayButton: (style, title, opts) ->
		style ?= Titanium.UI.iPhone.SystemButton.BORDERED
		title ?= if _.isFunction(@action.buttonText) then @action.buttonText() else @action.buttonText

		key = (String(style)+"style" || "nostyle")
		@buttons ?= {} # Keep an array to hold the different styled buttons since changing styles is apparently devastating to the Ti runtime
		shittyTI = style == Titanium.UI.iPhone.SystemButton.SPINNER
		
		# Set up opts. Get around Titanium bugs by not setting the enabled or title attributes if 
		# the style is the spinner type (which is proxied by a different object in titanium which
		# barfs when it gets these option)
		opts = _.extend({
			right: 5
			color: "#000"
			width: this.buttonWidth()
			height: 25
		}, (opts || {}))

		unless shittyTI
			opts.style = style if style?
		else
			opts.systemButton = style

		unless @buttons[key]?
			button = Ti.UI.createButton opts

			unless shittyTI
				button.addEventListener "click", (e) =>
					if _.isFunction(@clicked)
						@clicked(this, e)
					else
						Titanium.API.error("Clicked callback can't be run because it isn't a function!")

			@buttons[key] = button
			@row.add(button)

		for k, v of opts
			unless _.include(["style", "systemButton"], k)
				@buttons[key][k] = v
		for k, b of @buttons
			b.hide()
		@buttons[key].title = title
		@buttons[key].show()
		true

	displayText: ->
		text = Ti.UI.createLabel {
			top: 2
			left: this.textOffset()
			color:'#000'
			text: this.text()
			font:{fontSize:16, fontWeight:'bold'}
			minimumFontSize: 12
			width: (320 - 30 - this.textOffset() - this.buttonWidth())
		}
		@row.add(text)

	displayPhoto: ->
		photo = Ti.UI.createView {
			backgroundImage: this.icon()
			top: 5
			left: 5
			height: 30
			width: 30
		}
		@row.add(photo)

	# Updates the row to show the user it's currently running its action
	displayInProgress: ->
		d("Trying to display progress")
		@state = Citrus.ActionTableViewRow.InProgress
		@takeable = false
		this.displayButton(Titanium.UI.iPhone.SystemButton.SPINNER, "Running ...")

	# Updates the row to show the user it's done running its action and it worked!
	displaySuccess: ->
		d("Trying to display success")
		@state = Citrus.ActionTableViewRow.Success
		@takeable = false
		this.displayButton(Titanium.UI.iPhone.SystemButton.PLAIN, "Done!", {enabled: false, color: "#ccc"})
		d("Success displayed")

	# Updates the row to show that the action failed.
	displayError: (retry) ->
		d("Trying to display error")
		retry ?= true
		@state = Citrus.ActionTableViewRow.Error
		@takeable = retry
		this.displayButton(null,(if retry then "Retry?" else "Error!"), {color: 'red'})
		d("Error displayed")

	icon: ->
		return Citrus.getIconPath(@action.accountType)

	buttonText: ->
		return "Run"

	text: ->
		return @action.actionText

	textOffset: ->
		return 42
	buttonWidth: ->
		return 80

Citrus.ActionRows = {}
Citrus.registerActionViewRow = (klass) ->
	Citrus.ActionRows[klass::type] = klass

Citrus.ActionTableViewRow = ActionTableViewRow
Citrus.registerActionViewRow ActionTableViewRow
