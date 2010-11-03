/**
 * OAuth library for Spaz
 * @param {object} (service string)
 */
function SpazOAuth(args) {
	
	// this.db = new SpazDB();
	this.services = {};
	this.requestToken = null;
	this.accessToken = null;
	this.accessTokenSecret = null;

	this.initServices();
	this.setService(args.service);

	// Check to see if there is already an access token in the local database
	var that = this;
	// this.db.get('oauth', function(doc) {
	// 	if (doc && doc[that.getService().name]) {
	// 		that.accessToken = doc[that.getService().name].accessToken;
	// 		that.accessTokenSecret = doc[that.getService().name].accessTokenSecret;
	// 	}
	// });

};

/**
 * Initialize OAuth services that Spaz can use
 */
SpazOAuth.prototype.initServices = function() {
	this.addService('twitter', {
		signatureMethod      : 'HMAC-SHA1',
		consumerKey          : 'at0rryC4zHWNcIRhbIW0Fw',
		consumerSecret       : '1NrCi94u62mwaAvZyDjdznOVUN0vQdfsyLpiy2O4',
		requestTokenUrl      : 'https://twitter.com/oauth/request_token',
		accessTokenUrl       : 'https://twitter.com/oauth/access_token',
		userAuthorizationUrl : 'https://twitter.com/oauth/authorize'
	});
};

/**
 * Adds a new OAuth service
 * @param {string} serviceName
 * @param {object} opts (signatureMethod string, consumerKey string, consumerSecret string, requestTokenUrl string, accessTokenUrl string, userAuthorizationUrl string)
 */
SpazOAuth.prototype.addService = function(serviceName, opts) {

	var service = {};
	service.name                 = serviceName;
	service.signatureMethod      = opts.signatureMethod;
	service.consumerKey          = opts.consumerKey;
	service.consumerSecret       = opts.consumerSecret;
	service.requestTokenUrl      = opts.requestTokenUrl;
	service.accessTokenUrl       = opts.accessTokenUrl;
	service.userAuthorizationUrl = opts.userAuthorizationUrl;

	this.services[serviceName] = service;

};

/**
 * Sets the service currently being used by Spaz
 * @param {string} serviceName
 */
SpazOAuth.prototype.setService = function(serviceName) {
	this.service = serviceName;
};

/**
 * Returns the service set on object instantiation
 */
SpazOAuth.prototype.getService = function() {
	return this.services[this.service];
};

/**
 * Returns true if the user has already authorized Spaz with the service
 * and has an access token
 */
SpazOAuth.prototype.isAuthorized = function() {

	if (this.accessToken) {
		return true;
	}

	return false;

};

/**
 * Gets the request token
 */
SpazOAuth.prototype.getRequestToken = function() {

	var that = this;
	var success = false;
	var method = 'post';
	var authHeader = this.getAuthHeader({
		method: method,
		url: this.getService().requestTokenUrl
	});

	var xhr = jQuery.ajax({
		async: false,
		type: method,
		url: this.getService().requestTokenUrl,
		beforeSend: function(req) {
			req.setRequestHeader('Authorization', authHeader);
			req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			return true;
		},
		error: function(req, textStatus, e) {
			sch.error("Error fetching request token!");
			sch.error(e);
		},
		success: function(data, textStatus,req) {
			var results = OAuth.decodeForm(req.responseText);
			that.requestToken = OAuth.getParameter(results, 'oauth_token');

			// Open another browser window to allow the user to authorize
			// service access to Spaz and retrieve the authorization PIN
			// sc.helpers.openInBrowser(OAuth.addToURL(
			// 	that.getService().userAuthorizationUrl,
			// 	{oauth_token : that.requestToken}
			// ));
		}
	});

	return Titanium.Network.httpSuccess(xhr);

};

/**
 * Gets the request token
 */
SpazOAuth.prototype.getRequestTokenAsync = function(onSuccess, onError) {

	var that = this;
	var method = 'post';
	var authHeader = this.getAuthHeader({
		method: method,
		url: this.getService().requestTokenUrl
	});

	var xhr = jQuery.ajax({
		type: method,
		url: this.getService().requestTokenUrl,
		beforeSend: function(req) {
			req.setRequestHeader('Authorization', authHeader);
			req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			return true;
		},
		error: function(req, textStatus, e) {
			onError(req, textStatus, e);
		},
		success: function(data, textStatus,req) {
			var results = OAuth.decodeForm(req.responseText);
			that.requestToken = OAuth.getParameter(results, 'oauth_token');
			
			onSuccess(that.requestToken, req);
			// Open another browser window to allow the user to authorize
			// service access to Spaz and retrieve the authorization PIN
			// sc.helpers.openInBrowser(OAuth.addToURL(
			// 	that.getService().userAuthorizationUrl,
			// 	{oauth_token : that.requestToken}
			// ));
		}
	});

	return xhr;
};


/**
 * Authorize the user with the service and store the access token locally
 * @param {string} accessPIN
 */
SpazOAuth.prototype.getAuthorization = function(accessPIN) {

	if (!accessPIN || !this.requestToken) {
		return false;
	}

	var that = this;
	var success = false;
	var method = 'post';
	var authHeader = this.getAuthHeader({
		method: method,
		url: this.getService().accessTokenUrl,
		parameters: [
			['oauth_verifier', accessPIN],
			['oauth_token', this.requestToken]
		]
	});

	Ti.API.debug("Auth Header for authorization:");
	Ti.API.debug(authHeader);
	
	xhr = jQuery.ajax({
		async: false,
		type: method,
		url: this.getService().accessTokenUrl,
		beforeSend: function(req) {
			req.setRequestHeader('Authorization', authHeader);
			req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		},
		error: function(req, textStatus, error) {
			sch.error("Error fetching access token! Status: "+textStatus+" ("+req.status+"), error: ");
			sch.error(error);
			sch.error(req.responseText);
		}
		// success: function(data, req, textStatus) {
		// 	var results = OAuth.decodeForm(data);
		// 	that.accessToken = OAuth.getParameter(results, 'oauth_token');
		// 	that.accessTokenSecret = OAuth.getParameter(results, 'oauth_token_secret');
		// 
		// 	// Store the access token to the local database
		// 	var doc = { key: 'oauth' };
		// 	doc[that.getService().name] = {
		// 		accessToken: that.accessToken,
		// 		accessTokenSecret: that.accessTokenSecret
		// 	};
		// 	// that.db.set(doc);
		// 
		// 	success = true;
		// }
	});


	if(Titanium.Network.httpSuccess(xhr) && xhr.responseText.length > 0) {
		var results = OAuth.decodeForm(xhr.responseText);
		that.accessToken = OAuth.getParameter(results, 'oauth_token');
		that.accessTokenSecret = OAuth.getParameter(results, 'oauth_token_secret');

		// Store the access token to the local database
		var doc = { key: 'oauth' };
		doc[that.getService().name] = {
			accessToken: that.accessToken,
			accessTokenSecret: that.accessTokenSecret
		};
		// that.db.set(doc);
		return true;
	} else {
		return false;
	}

};




/**
 * Authorize the user with the service and store the access token locally
 * @param {object} opts
 * @param {object} opts.username the username
 * @param {object} opts.password the password
 * @param {object} [opts.mode] default is 'client_auth'
 * @param {object} [opts.onSuccess] callback on success
 * @param {object} [opts.onFailure] callback on failure
 */
SpazOAuth.prototype.getXauthTokens = function(opts) {

	if (!opts.username || !opts.password) {
		sch.error('Username and password required by getXauthTokens');
		return;
	}

	opts = sch.defaults({
		'mode':'client_auth'
	}, opts);

	var that = this;
	var method = 'post';
	var authHeader = this.getAuthHeader({
		method: method,
		url: this.getService().accessTokenUrl,
		xauth: true,
		parameters: [
			['x_auth_username', opts.username],
			['x_auth_password', opts.password],
			['x_auth_mode', opts.mode]
		]
	});

	jQuery.ajax({
		type: method,
		url: this.getService().accessTokenUrl,
		data: {
			'x_auth_username': opts.username,
			'x_auth_password': opts.password,
			'x_auth_mode': opts.mode
		},
		beforeSend: function(req) {
			req.setRequestHeader('Authorization', authHeader);
			req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		},
		success: function(data, textStatus) {

				var results = OAuth.decodeForm(data);
				alert(JSON.stringify(results));
				that.accessToken = OAuth.getParameter(results, 'oauth_token');
				that.accessTokenSecret = OAuth.getParameter(results, 'oauth_token_secret');

				// Store the access token to the local database
				var doc = { key: 'oauth' };
				doc[that.getService().name] = {
					accessToken: that.accessToken,
					accessTokenSecret: that.accessTokenSecret
				};
				// that.db.set(doc);
				if (opts.onSuccess) {
					opts.onSuccess(data, textStatus);
				}			
		},
		failure: function(req, textStatus, error) {
			if (opts.onFailure) {
				opts.onFailure(req, textStatus, error);
			}
		},
		complete: function(req, textStatus) {
			sch.error(req.responseText);
			sch.error(textStatus);
		}
	});

};



/**
 * Returns the value of the HTTP authorization header to use for the request
 * @param {Object} options Must include method and url, optionally parameters
 * @param {Object} [options.parameters] parameters passed with the request
 * @param {boolean} [options.xauth] pass this as an xauth request, removing any tokens
 * @param {string} [options.method] the http method to use (usually 'get' or 'post')
 * @param {string} [options.url] the url
 */
SpazOAuth.prototype.getAuthHeader = function(options) {
	var complete_opts, params;

	if (!options.method || !options.url) {
		return false;
	}

	if (!options.parameters) {
		params = [];
	} else {
		if(_.isArray(options.parameters)) {
			params = _.compact(options.parameters);
		} else {
			params = _.extend({}, options.parameters);
		}

	}
	
	if (options.xauth) {
		complete_opts = {
			consumerKey: this.getService().consumerKey,
			consumerSecret: this.getService().consumerSecret
		};
	} else {
		complete_opts = {
			consumerKey: this.getService().consumerKey,
			consumerSecret: this.getService().consumerSecret,
			token: this.accessToken,
			tokenSecret: this.accessTokenSecret
		};	
	}

	var message = {
		method: options.method,
		action: options.url,
		parameters: params
	};
		
	OAuth.completeRequest(message, complete_opts);
		
	var authHeader = OAuth.getAuthorizationHeader(
		this.getService().name,
		params
	);
	
	return authHeader;
};

