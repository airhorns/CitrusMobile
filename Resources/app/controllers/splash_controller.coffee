Ti.include("/app/views/splash/splash_window.js")

class SplashController extends Citrus.Controller
	constructor: (codeData, accountStore) ->
		@store = accountStore
		@codeData = codeData
		@window = new Citrus.SplashWindow(this)
		root.tabGroup.activeTab.open @window.win, {animated:true}

		this.tryToShow()

	tryToShow: () ->
		d("Trying to show "+@codeData)
		@window.showLoading()

		Citrus.Splash.newFromDecodedData(@codeData, (splash) =>
			d("Found a splash in the decoded data, with shortcode "+splash.shortcode)
			@splash = splash
			@window.displaySplash(@splash)
		, (xhr, status, error) =>
			e("Error finding a Citrus splash from the decoded data. Status: "+status)
			e(xhr.responseText)
			if xhr
				# The scanned code was a citrus code but there was a problem connecting to the backend.
				if !Titanium.Network.online
					msg = "You need to be connected to the internet to scan this code. Please connect and then retry."
					retry = true
				else if xhr.status == 404
					msg = "This code couldn't be found in our database, probably because it's been deleted!"
					retry = false
				else
					msg = "There was an error fetching this code from the server! Please try again."
					retry = true
			else
				# The xhr request was never made because the data couldn't be interpreted as Citrus data.
				if status == "not_citrus_code"
					@window.displayDecodedData(@codeData)
					return true

			@window.displayError(msg, retry, => this.tryToShow())
			return false
		)

	# Gets passed the row object wrapper and the click event for a button in the list of actions.
	# Runs the action on the available accounts.
	takeActionFromRow: (row, e) =>
		action = row.action
		accounts = this.possibleAccountsForAction(action)

		actionSuccess = (e) =>
			Titanium.API.debug("Action complete!")
			row.displaySuccess()

		actionFailure = (xhr, status, error) =>
			Titanium.API.error("Action failed!")
			Titanium.API.error(status)
			d(error)
			d(xhr.responseText)
			row.displayError()

		runAction = (account) =>
			row.displayInProgress()
			action.run(account, actionSuccess, actionFailure)

		if accounts.length > 1
			# Create a selection popup with options for accounts
			opts =  _.map(accounts, (account) -> account.screenName)
			if _.isArray(opts)
				opts.push("All")
				all_index = opts.length - 1
				opts.push("Cancel")
				cancel_index = opts.length - 1

			@dialog = Titanium.UI.createOptionDialog {
				options: opts
				title: "Select which accounts to "+row.text()+"."
				destructive: all_index
				cancel: cancel_index
			}

			@dialog.addEventListener "click", (e) =>
				if e.index == cancel_index
					Titanium.API.debug("Account select dialog was canceled.")
					# Dialog was canceled, do nothing.
				else if e.index == all_index
					# All accounts.
					Titanium.API.debug("Running on all accounts")
					for account in accounts
						runAction(account)
				else
					# Account at index e.index - 2
					account = accounts[e.index]
					if account?
						Titanium.API.debug("Running on account "+account.screenName)
						runAction(account)

			@dialog.show() # Show the selection dialog
		else
			# Only one account
			d("running on "+accounts[0])
			runAction(accounts[0])
			return true


	# Boolean return if an action can be taken by any of the accounts available
	isActionTakeable: (action) ->
		_.any @store.accounts, (account) =>
			return this._canAccountRunAction(account, action)

	# List of accounts that can take an action
	possibleAccountsForAction: (action) ->
		_.select @store.accounts, (account) =>
			return this._canAccountRunAction(account, action)

	# Gets the second argument curried from the functions above
	_canAccountRunAction: (account, action) ->
		return action.accountType == account.type

Citrus.SplashController = SplashController
