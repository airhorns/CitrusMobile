(function() {
  var FoursquareAccount;
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  }, __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  Ti.include('/app/views/accounts/foursquare_xauthorization_window.js');
  Ti.include('/vendor/foursquare.js');
  FoursquareAccount = function(params) {
    FoursquareAccount.__super__.constructor.call(this, params);
    this.consumer = new SpazOAuth({
      'service': 'foursquare'
    });
    this.api = new Citrus.FoursquareAPI();
    this.api.consumer = this.consumer;
    this.consumer.accessToken = this.accessToken;
    this.consumer.accessTokenSecret = this.accessTokenSecret;
    d("Initializing FSQ account", params, this.accessToken, this.accessTokenSecret, this.consumer.isAuthorized());
    return this;
  };
  __extends(FoursquareAccount, Citrus.Account);
  FoursquareAccount.prototype.type = "FoursquareAccount";
  FoursquareAccount.prototype.persistableAttributes = ["location", "name", "accessToken", "accessTokenSecret"];
  FoursquareAccount.prototype.synch = function() {
    this.fireEvent("state:updating");
    if (!this.isAuthorized()) {
      Ti.API.debug("Trying to synch Twitter Account but account is not authorized!");
      this.fireEvent("state:error");
      return false;
    }
    return this.api.getDetails(null, __bind(function(data) {
      this.name = ((data.user == null ? undefined : data.user.firstname) + " " + (data.user == null ? undefined : data.user.lastname)) || (data.user == null ? undefined : data.user.email);
      if (!(this.name)) {
        er("Not enough information returned from foursquare to make an account");
        this.fireEvent("state:error");
        return false;
      }
      this.location = data.user == null ? undefined : data.user.checkin == null ? undefined : data.user.checkin.venue == null ? undefined : data.user.checkin.venue.name;
      this.fireEvent("state:ready");
      return this.markAsSynched();
    }, this), __bind(function(e, status, error) {
      Ti.API.error("Couldn't retrive account information! Status: " + status);
      Ti.API.error("Status: " + e.status);
      Ti.API.error("Message: " + error.message);
      Ti.API.error("Response: " + e.responseText);
      return this.fireEvent("state:error");
    }, this));
  };
  FoursquareAccount.prototype.isAuthorized = function() {
    return this.consumer.isAuthorized();
  };
  FoursquareAccount.prototype.authorize = function() {
    var canceled, controller, gotData;
    d("Starting XAuth Foursquare authorization");
    controller = {};
    gotData = __bind(function(data) {
      data = {
        username: data.email,
        password: data.password
      };
      controller.showLoading();
      return this.consumer.getXauthTokens(_.extend(data, {
        onSuccess: __bind(function(e) {
          d("Sucess getting xauth tokens");
          controller.hideLoading();
          this.completeAuthorization();
          return controller.destroy();
        }, this),
        onError: __bind(function(xhr, status, e) {
          er("Unable to get XAuth tokens with supplied data.");
          d(status);
          d(xhr.status);
          d(xhr.responseText);
          d(e);
          if (xhr.status === 401) {
            controller.showCredentialsError();
          } else {
            controller.showCommunicationError();
          }
          Ti.API.error("Error finding pin in authorize UI. Canceling process.");
          this.fireEvent("authorization:error", e);
          return this.fireEvent("authorization:complete");
        }, this)
      }));
    }, this);
    canceled = __bind(function(e) {
      this.fireEvent("authorization:error", e);
      return this.fireEvent("authorization:complete");
    }, this);
    return (controller = new Citrus.XAuthorizationController(gotData, canceled, Citrus.FoursquareXAuthorizationWindow));
  };
  FoursquareAccount.prototype.completeAuthorization = function() {
    this.accessToken = this.consumer.accessToken;
    this.accessTokenSecret = this.consumer.accessTokenSecret;
    this.api.consumer = this.consumer;
    return FoursquareAccount.__super__.completeAuthorization.call(this);
  };
  Citrus.registerAccount(FoursquareAccount);
}).call(this);
