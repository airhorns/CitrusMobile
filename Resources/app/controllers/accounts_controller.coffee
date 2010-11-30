Ti.include('/app/controllers/oauthorization_controller.js')
Ti.include('/app/controllers/xauthorization_controller.js')
Ti.include("/app/models/accounts/account.js")
Ti.include("/app/models/accounts/account_set.js")
Ti.include("/app/views/accounts/accounts_table_view_window.js")
Ti.include("/app/views/accounts/account_table_view_row.js")
Ti.include("/app/views/accounts/new_account_select_window.js")

class AccountsController extends Citrus.Controller
	# List of accounts being watched by this controller
	watchedAccounts: []

	# Creates the window
	constructor: (store) ->
		@store = store

		for account in @store.accounts
			this.watchAccount(account)

		@window = new Citrus.AccountsTableViewWindow(this, @store.accounts)

		setTimeout( ->
			root.fireEvent("synch:start", {source: "accounts controller"})
		, 500)

	# Callback called when add new account button is pressed. Creates an account, watches it, and starts it along its
	# authorization path.
	addNewAccount: ->
		if ! Titanium.Network.online
			alert("You aren't connected to the internet right now, so you won't be able to connect authorize the account. Please connect to the internet and try again.")
			return false

		@selectWindow ?= new Citrus.NewAccountSelectWindow this, (type) =>
			this.addNewAccountOfType(type)

		root.tabGroup.activeTab.open @selectWindow.win, {animated:true}

	# Calledback from the NewAccountSelectWindow
	# Returns true or false based on the instantiation of the account,
	# not the authorization.
	addNewAccountOfType: (type, callback) ->
		if _.isFunction(type)
			account = new type()
		else
			account = new Citrus[type]()

		if account? && account.valid
			this.watchAccount(account)
			# Callback to trigger initial sync
			success = () =>
				@selectWindow.win.close({animated: false}) if @selectWindow?
				account.synch()
				account.removeEventListener "authorization:success", success
				if callback?
					callback(account)

			account.addEventListener "authorization:success", success
			account.authorize() # This adds a new window to the heirarchy
			d("Created account and added authorization success listener")
			return account
		else
			er("Couldn't create a new account of type "+type)
			er(account)
			return false

	# Called on each account to set up event listeners
	watchAccount: (account) ->
		return true if _.include(@watchedAccounts, account)
		@watchedAccounts.push account

		account.addEventListener "authorization:error", (e) =>
			Ti.API.debug("Authorization Error!")
			#Ti.API.debug(e)
			alert("There was an error authorizing your account. Please try again.")

		# Called when a row is loading it's information
		account.addEventListener "state:updating", (e) =>
			@window.showLoading()

		# Called when row is first ready to show and when it updates.
		account.addEventListener "state:ready", (e) =>
			d("Account state is ready")
			if account.displayed? && account.displayed
				@window.updateAccountDisplay(account)
			else
				@store.addAccount(account)
				@window.displayAccount(account)

			@window.hideLoading()

		# Called if row has error loading
		account.addEventListener "state:error", (e) =>
			@window.hideLoading()
			alert("There was an error retrieving your details. Please try again.")

		account.addEventListener "state:deleted", (e) =>
			@store.removeAccount(account)
			delete account
			delete e.row.wrapper

Citrus.AccountsController = AccountsController
