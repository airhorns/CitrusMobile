(function() {
  var FacebookAccount;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  Ti.include("/app/controllers/facebook_authorization_controller.js");
  FacebookAccount = function() {
    if (_.any(root.accountStore, function(a) {
      return a.type === "FacebookAccount";
    })) {
      d("Trying to create a second Facebook account. No can do at the moment.");
      alert("Multiple Facebook accounts aren't supported right now, sorry!");
      return null;
    } else {
      return FacebookAccount.__super__.constructor.apply(this, arguments);
    }
    return this;
  };
  __extends(FacebookAccount, Citrus.Account);
  FacebookAccount.prototype.type = "FacebookAccount";
  FacebookAccount.prototype.isAuthorized = function() {
    return Ti.Facebook.isLoggedIn();
  };
  FacebookAccount.prototype.authorize = function(success) {
    var controller, errorLoggingIn, loggedIn;
    d("Starting facebook authorization");
    loggedIn = function(session) {
      d("Successfully logged in to facebook");
      return d(session);
    };
    errorLoggingIn = function(e) {
      er("Error logging in with facebook account!");
      er(e);
      er(Titanium.Facebook.session);
      er(Titanium.Facebook.isLoggedIn());
      return Titanium.Facebook.publishStream("Test status! Woooohooo", null, null, function(e) {
        d("Trying to publish stream");
        return d(e);
      });
    };
    return (controller = new Citrus.FacebookAuthorizationController(loggedIn, errorLoggingIn));
  };
  Citrus.registerAccount(FacebookAccount);
}).call(this);
