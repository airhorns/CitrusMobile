Ti.include("/app/views/accounts/xauthorization_window.js")

class XAuthorizationController extends Citrus.Controller
	constructor: (collectSuccess, collectCancel, viewClass)->
		viewClass ?= Citrus.XAuthorizationWindow
		@window = new viewClass(this)
		@window.addEventListener "info:collected", (e) =>
			# validateInfo will alert the user of any issues
			if this.validateInfo()
				collectSuccess(this.data())
		
		root.tabGroup.activeTab.open @window.win, {animated:true}
		@loading = new Citrus.ModalLoadingView("Authorizing Account...", this)

		
	validateInfo: () ->
		d this.data()
		for name, val of this.data()
			if val == ""
				alert "All fields are required"
				return false
		return true

	data: () ->
		@window.data()
	
	showCredentialsError: () ->
		this.hideLoading()
		alert("Your username and password could not be verified. Please ensure they are correct and try again.")
	
	showCommunicationError: () ->
		this.hideLoading()
		alert("There was an error contacting the Twitter servers. Please try again.")
	
	showLoading: () ->
		@loading.show(@window.win)
	hideLoading: () ->
		@loading.hide(@window.win)
	destroy: () ->
		@window.win.close()

Citrus.XAuthorizationController = XAuthorizationController
