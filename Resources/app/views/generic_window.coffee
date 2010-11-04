class GenericWindow extends Citrus.Observable
	constructor: (controller) ->
		if controller
			@controller = controller
		else
			Titanium.API.warn("Warning! No controller was passed to the constructor of a window!")
 
Citrus.GenericWindow = GenericWindow
