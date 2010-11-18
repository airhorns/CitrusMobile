_.extend Citrus, {
	redirectifyLinks: (str) ->
		str.replace(/href="(.+?)"/, 'href="citrus_redirect.html?to=$1"')
	
	redirectableLink: (str) ->
		matches = str.match /citrus_redirect.html\?to=(.+?)$/
		if matches? && matches
			return matches[1]
		else
			return false
	}

