# Titanium.Network.ajaxComplete((e, xhr, options) ->
# 	d("Complete.", xhr, options)
# )
# 
# Titanium.Network.ajaxError((e, xhr, options, error) ->
# 	er("Error.", xhr, options, error)
# )
# 
# Titanium.ajax
# 	url: "http://citrus.heroku.com/s/coff33.json"
# 	type: "GET"
# 	dataType: "json"
# 	success: (data) ->
# 		Titanium.API.info(data)
# 
# Titanium.ajax
# 	url: "http://citrus.heroku.com/s/sdfgsdfgsdfgsdfg"
# 	type: "GET"
# 	dataType: "json"
# 	success: (data) ->
# 		d("This should never get shown!")
# 		Titanium.API.info(data)
# 
