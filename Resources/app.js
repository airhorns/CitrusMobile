// App.js

// Module Includes
// Ti.Paypal = require('ti.paypal');

// Namespaces
var Citrus = {};
var jQuery = {};

// Global configuration variables
Citrus.Config = {
	REMOTE_URL: "http://citrus.heroku.com/",
	SHORTENER_PREFIX: "s/",
	SHORTCODE_RE: "s/([a-zA-Z0-9]+)",	
	TWITTER_XAUTH: false
};

// Debugging functions
var d = function(x) {
	for(var i = 0; i < arguments.length; i++) {
		Titanium.API.debug(arguments[i]);
	}
};
var e = function() {
	for(var i = 0; i < arguments.length; i++) {
		Titanium.API.error(arguments[i]);
	}
};

//Ti.App.Properties.setString("CitrusAccounts","")
// Application level requires
// Underscore JS
Ti.include('vendor/underscore.js');

// jQuery $.ajax implementation in titanium
Ti.include('vendor/tiajax.js');


Ti.include('vendor/underscore.js');

// OAuth Javascript libraries
Ti.include('/vendor/sha1.js');
Ti.include('/vendor/oauth.js');

// Jester 
// Ti.include('/vendor/jester.js');
// Ti.include('/vendor/titanium_jester.js');
// Jester.defaultPrefix = "http://localhost:3000/";

// Backbone.js
// Ti.include('/vendor/backbone.js');

// Inflections
Ti.include('/vendor/inflections.js')

// Spazcore Library
Ti.include('/vendor/spazcore/libs/spazcore.js');
Ti.include('/vendor/spazcore/helpers/javascript.js');
Ti.include('/vendor/spazcore/helpers/json.js');
Ti.include('/vendor/spazcore/helpers/url.js');
Ti.include('/vendor/spazcore/helpers/datetime.js');
Ti.include('/vendor/spazcore/helpers/string.js');
Ti.include('/vendor/spazcore/libs/spazaccounts.js');
Ti.include('/vendor/spazcore/libs/spazauth.js');
Ti.include('/vendor/spazcore/incubator/libs/spazoauth.js');
Ti.include('/vendor/spazcore/helpers/sys.js');
Ti.include('/vendor/spazcore/platforms/Titanium/helpers/sys.js');
//Ti.include('/vendor/spazcore/platforms/Titanium/helpers/window.js')
//Ti.include('/vendor/spazcore/platforms/Titanium/libs/spazprefs.js')


// SpazCore setup
jQuery = Titanium.Network;
sc.dumplevel = 999;

// Citrus Specific Abstractions
Ti.include('app/models/object.js');
Ti.include('app/models/persisted_object.js');
Ti.include('app/views/generic_window.js');
Ti.include('app/views/placeholder_window.js');
Ti.include('app/controllers/controller.js');

var root = new Citrus.Object(); // Make sure root gets event listeners
Ti.include('app/controllers/main.js');
