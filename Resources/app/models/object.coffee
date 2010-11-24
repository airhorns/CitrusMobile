class CustomObject extends Citrus.Observable
	constructor: () ->
		this.tid = String(new Date().valueOf())
		
	# @delegateTo: () ->
	# 	delegate = arguments[0]
	# 	if delegate and arguments.length > 1
	# 		
	# 		# For each passed method name, delegate it to the delegate
	# 		for name in arguments[1..arguments.length]
	# 			Ti.API.debug("Defining "+name+" on "+this)
	# 
	# 			this.prototype[name] = () ->
	# 				if this[delegate]?
	# 					this[delegate].apply(name, arguments)

Citrus.Object = CustomObject
