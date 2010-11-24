Ti.include("/app/views/accounts/email_collection_window.js")

class EmailCollectionController extends Citrus.Controller
	emailRegex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	
	constructor: (collectSuccess, collectCancel, viewClass)->
		viewClass ?= Citrus.EmailCollectionWindow
		@window = new viewClass(this)
		@window.addEventListener "info:collected", (e) =>
			# validateInfo will alert the user of any issues
			if this.validateInfo()
				collectSuccess(this.data())
		
		root.tabGroup.activeTab.open @window.win, {animated:true}
		
	validateInfo: () ->
		for name, val of this.data()
			if name == "email"
				d("checking email", val, @emailRegex, @emailRegex.test(val))
				unless @emailRegex.test(val)
					alert "Please enter a valid email."
					return false
			else if val == ""
				alert "All fields are required"
				return false
		return true

	data: () ->
		d = @window.data()
		for k,v of d
			d[k] = v.toLowerCase() if k == "email"
		d
	
	destroy: () ->
		@window.win.close()

Citrus.EmailCollectionController = EmailCollectionController
