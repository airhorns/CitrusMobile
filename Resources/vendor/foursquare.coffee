class FoursquareAPI
	@baseURL: 'http://api.foursquare.com/v1/'
	@urlMap:
		user: FoursquareAPI.baseURL+'user'
		checkIn: FoursquareAPI.baseURL+'checkin'
		sendFriendRequest: FoursquareAPI.baseURL+'friend/sendrequest'

	me:
		firstname: ""
		lastname: ""
		gender: ""
		phone: ""

	getDetails: (uid, success, failure) ->
		options =
			type: 'GET'
			url: this._getURL('user')
			success: (data, status, xhr) ->
				@me = data.user
				success(data, status, xhr) if success?
			failure: failure
			data: {}

		options.data.uid = uid if uid?
		this._callMethod(options)
	
	checkIn: (vid, success, failure) ->
		options =
			type: 'POST'
			url: this._getURL('checkIn')
			success: success
			failure: failure
			data:
				vid: vid
		
		this._callMethod(options)

	sendFriendRequest: (uid, success, failure) ->
		unless uid?
			er("Trying to add a friend without passing a UID!")
			failure({})
			return false

		options =
			type: 'POST'
			url: this._getURL('sendFriendRequest')
			success: success
			failure: failure
			data:
				uid: uid

		this._callMethod(options)
	

	_getURL: (key) ->
		d(this.constructor)

		url = this.constructor.urlMap[key]
		return url+".json" if url?
		throw {
			type: "ArgumentError"
			message: "Nonexistant key "+key+" for the foursquare api url map."
		}

	_callMethod: (options) ->
		unless @consumer? && @consumer.isAuthorized()
			e("Trying to run foursquare api without an authorized consumer!")
			options.failure() if options.failure?
			return false

		# Create local reference for before send
		consumer = @consumer

		options = _.extend({
			type: 'GET'
			dataType: 'json'
			beforeSend: (xhr) ->
				auth_header = consumer.getAuthHeader
					method: options.type
					url: options.url
					parameters: options.data
				d("Signing with "+auth_header)
				xhr.setRequestHeader('Authorization', auth_header)
		}, options)

		oldSuccess = options.success
		oldError = options.error
		that = this
		options.success = (data, status, xhr) ->
			d("Success talking to foursquare api", data)
			oldSuccess.call(that, data, status, xhr) if oldSuccess?
		options.error = (xhr, status, error) ->
			e("Error contacting Foursquare!")
			e error, status, xhr
			oldErrror.call(that, data, status, xhr) if oldError?
		d options
		Titanium.ajax(options)

Citrus.FoursquareAPI = FoursquareAPI
