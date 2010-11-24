(function() {
  var Citrus_CONSUMER_SECRET, TwitterOAuthAdapter;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Ti.include('vendor/sha1.js');
  Ti.include('vendor/oauth.js');
  Citrus_CONSUMER_SECRET = '1NrCi94u62mwaAvZyDjdznOVUN0vQdfsyLpiy2O4';
  TwitterOAuthAdapter = function() {
    function TwitterOAuthAdapter() {
      TwitterOAuthAdapter.__super__.constructor.apply(this, arguments);
    }
    __extends(TwitterOAuthAdapter, Citrus.Account);
    TwitterOAuthAdapter.prototype.consumerSecret = Citrus_CONSUMER_SECRET;
    TwitterOAuthAdapter.prototype.consumerKey = 'at0rryC4zHWNcIRhbIW0Fw';
    TwitterOAuthAdapter.prototype.signatureMethod = 'HMAC-SHA1';
    TwitterOAuthAdapter.prototype.pin = null;
    TwitterOAuthAdapter.prototype.requestToken = null;
    TwitterOAuthAdapter.prototype.requestTokenSecret = null;
    TwitterOAuthAdapter.prototype.accessToken = null;
    TwitterOAuthAdapter.prototype.accessTokenSecret = null;
    TwitterOAuthAdapter.prototype.accessor = {
      consumerSecret: Citrus_CONSUMER_SECRET,
      tokenSecret: ''
    };
    TwitterOAuthAdapter.prototype.authorizationWindow = null;
    TwitterOAuthAdapter.prototype.authorizationView = null;
    TwitterOAuthAdapter.prototype.authorizationWebView = null;
    TwitterOAuthAdapter.prototype.isAuthorized = function() {
      return (this.accessToken != null) && (this.accessTokenSecret != null);
    };
    TwitterOAuthAdapter.prototype.createMessage = function(url) {
      var message;
      message = {
        action: url,
        method: 'POST',
        parameters: []
      };
      message.parameters.push(['oauth_consumer_key', this.consumerKey]);
      message.parameters.push(['oauth_signature_method', this.signatureMethod]);
      return message;
    };
    TwitterOAuthAdapter.prototype.getRequestToken = function(url) {
      var message, parameterMap, responseParams, xhr;
      this.accessor.tokenSecret = '';
      message = this.createMessage(url);
      OAuth.setTimestampAndNonce(message);
      OAuth.SignatureMethod.sign(message, this.accessor);
      parameterMap = OAuth.getParameterMap(message.parameters);
      xhr = Titanium.ajax({
        url: url,
        type: "POST",
        data: parameterMap,
        async: false
      });
      responseParams = OAuth.getParameterMap(xhr.responseText);
      this.requestToken = responseParams['oauth_token'];
      this.requestTokenSecret = responseParams['oauth_token_secret'];
      Ti.API.debug(xhr.responseText);
      return xhr.responseText;
    };
    TwitterOAuthAdapter.prototype.destroyAuthorizeUI = function() {
      Ti.API.debug('destroyAuthorizeUI');
      try {
        Ti.API.debug('destroyAuthorizeUI:webView.removeEventListener');
        this.authorizationWebView.removeEventListener('load', this.authorizeUICallback);
        Ti.API.debug('destroyAuthorizeUI:window.close()');
        return this.authorizationWindow.close();
      } catch (ex) {
        Ti.API.debug(ex);
        return Ti.API.debug('Cannot destroy the authorize UI. Ignoring.');
      }
    };
    TwitterOAuthAdapter.prototype.authorizeUICallback = function(e) {
      var i, id, node, nodeList, xmlDocument;
      xmlDocument = Ti.XML.parseString(e.source.html);
      nodeList = xmlDocument.getElementsByTagName('div');
      i = 0;
      while (i < nodeList.length) {
        node = nodeList.item(i);
        id = node.attributes.getNamedItem('id');
        if (id && id.nodeValue === 'oauth_pin') {
          this.pin = node.text;
          if ((this.receivePinCallback != null)) {
            setTimeout((__bind(function() {
              return this.receivePinCallback();
            }, this)), 100);
          }
          id = null;
          node = null;
          this.destroyAuthorizeUI();
          break;
        }
        i++;
      }
      nodeList = null;
      return xmlDocument = null;
    };
    TwitterOAuthAdapter.prototype.receivePin = function() {
      this.getAccessToken('https://api.twitter.com/oauth/access_token');
      Ti.API.debug(this.accessToken);
      Ti.API.debug(this.accessTokenSecret);
      if (this.connected != null) {
        return this.connected();
      }
    };
    TwitterOAuthAdapter.prototype.showAuthorizeUI = function(url) {
      var animation, closeLabel, transform;
      this.receivePinCallback = this.receivePin;
      this.authorizationWindow = Ti.UI.createWindow({
        modal: true,
        navBarHidden: true
      });
      transform = Ti.UI.create2DMatrix().scale(0);
      this.authorizationView = Ti.UI.createView({
        top: 5,
        width: 310,
        height: 450,
        border: 10,
        backgroundColor: 'white',
        borderColor: '#aaa',
        borderRadius: 20,
        borderWidth: 5,
        zIndex: -1,
        transform: transform
      });
      closeLabel = Ti.UI.createLabel({
        textAlign: 'right',
        font: {
          fontWeight: 'bold',
          fontSize: '15pt'
        },
        text: '[X]',
        top: 0,
        right: 12,
        width: 20
      });
      this.authorizationWindow.open();
      this.authorizationWebView = Ti.UI.createWebView({
        autoDetect: [Ti.UI.AUTODETECT_NONE]
      });
      this.authorizationWebView.addEventListener('load', __bind(function(e) {
        return this.authorizeUICallback(e);
      }, this));
      this.authorizationView.add(this.authorizationWebView);
      this.authorizationWindow.add(this.authorizationView);
      closeLabel.addEventListener('click', __bind(function() {
        return this.destroyAuthorizeUI();
      }, this));
      this.authorizationView.add(closeLabel);
      animation = Ti.UI.createAnimation();
      animation.transform = Ti.UI.create2DMatrix();
      animation.duration = 500;
      return this.authorizationView.animate(animation);
    };
    TwitterOAuthAdapter.prototype.requestAccessWithUI = function(url) {
      this.authorizationWebView.url = url;
      return this.authorizationWebView.reload();
    };
    TwitterOAuthAdapter.prototype.getAccessToken = function(url) {
      var message, p, parameterMap, responseParams, xhr, _i, _len;
      this.accessor.tokenSecret = this.requestTokenSecret;
      message = this.createMessage(url);
      message.parameters.push(['oauth_token', this.requestToken]);
      message.parameters.push(['oauth_verifier', this.pin]);
      OAuth.setTimestampAndNonce(message);
      OAuth.SignatureMethod.sign(message, this.accessor);
      parameterMap = OAuth.getParameterMap(message.parameters);
      for (_i = 0, _len = parameterMap.length; _i < _len; _i++) {
        p = parameterMap[_i];
        Ti.API.debug(p + ': ' + parameterMap[p]);
      }
      xhr = Titanium.ajax({
        url: url,
        type: "POST",
        data: parameterMap,
        async: false
      });
      responseParams = OAuth.getParameterMap(client.responseText);
      this.accessToken = responseParams['oauth_token'];
      this.accessTokenSecret = responseParams['oauth_token_secret'];
      Ti.API.debug('*** get access token, Response: ' + client.responseText);
      return client.responseText;
    };
    TwitterOAuthAdapter.prototype.send = function(url, parameters, method, successCallback, errorCallback) {
      var k, message, parameterMap, v, xhr;
      method != null ? method : method = 'GET';
      successCallback != null ? successCallback : successCallback = function(e) {};
      errorCallback != null ? errorCallback : errorCallback = function(e) {};
      Ti.API.debug('Sending a ' + method + ' message to the service at [' + url + '] with the following params: ' + JSON.stringify(parameters));
      if (!(this.accessToken != null) || !(this.accessTokenSecret != null)) {
        Ti.API.debug('The send cannot be processed as the client doesn\'t have an access token.');
        return false;
      }
      this.accessor.tokenSecret = this.accessTokenSecret;
      message = this.createMessage(url);
      message.parameters.push(['oauth_token', this.accessToken]);
      OAuth.setTimestampAndNonce(message);
      OAuth.SignatureMethod.sign(message, this.accessor);
      for (k in parameters) {
        if (!__hasProp.call(parameters, k)) continue;
        v = parameters[k];
        message.parameters.push([k, v]);
      }
      message.method = method;
      Ti.API.debug("Sending message: " + JSON.stringify(message));
      parameterMap = OAuth.getParameterMap(message.parameters);
      xhr = Titanium.ajax({
        url: url,
        type: method,
        data: parameterMap,
        error: errorCallback,
        success: successCallback
      });
      return client;
    };
    TwitterOAuthAdapter.prototype.authorizeWithTwitter = function() {
      var token;
      this.showAuthorizeUI();
      Ti.API.debug("Getting Request token");
      token = this.getRequestToken('https://api.twitter.com/oauth/request_token');
      Ti.API.debug(token);
      if (!(token != null)) {
        Ti.API.debug("Token is null!");
        this.destroyAuthorizeUI();
        alert("There was an error getting authorization started with Twitter! Please try again.");
        return false;
      }
      return this.requestAccessWithUI('https://api.twitter.com/oauth/authorize?' + token);
    };
    return TwitterOAuthAdapter;
  }();
  Citrus.TwitterOAuthAdapter = TwitterOAuthAdapter;
}).call(this);
