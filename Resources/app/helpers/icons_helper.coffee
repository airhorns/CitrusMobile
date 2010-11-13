_.extend Citrus, {
	getIconPath: (name) ->
		name = (name || "Generic").toLowerCase().replace("account", "").replace("action", "")
		path = "images/account_icons/"+name+".png"
		d(path)
		return path
}
