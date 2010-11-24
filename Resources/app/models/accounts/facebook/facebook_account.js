(function() {
  var FacebookAccount;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Ti.include("/app/controllers/facebook_authorization_controller.js");
  FacebookAccount = function() {
    function FacebookAccount() {
      this.synch = __bind(this.synch, this);;      FacebookAccount.__super__.constructor.apply(this, arguments);
      if ((root.accountStore != null) && _.any(root.accountStore.accounts, function(a) {
        return a.type === "FacebookAccount";
      })) {
        d("Trying to create a second Facebook account. No can do at the moment.");
        alert("Multiple Facebook accounts aren't supported right now, sorry!");
        this.valid = false;
      }
    }
    __extends(FacebookAccount, Citrus.Account);
    FacebookAccount.prototype.type = "FacebookAccount";
    FacebookAccount.prototype.persistableAttributes = ["name", "affiliations"];
    FacebookAccount.prototype.isAuthorized = function() {
      return Ti.Facebook.isLoggedIn();
    };
    FacebookAccount.prototype.synch = function() {
      var fql;
      d("Synching facebook account");
      this.fireEvent("state:updating");
      if (!this.isAuthorized()) {
        d("Trying to synch Facebook account but account is not authorized!");
        this.fireEvent("state:error");
        return false;
      } else {
        fql = "SELECT name, affiliations FROM user WHERE uid = me()";
        return Titanium.Facebook.query(fql, __bind(function(e) {
          var _ref;
          if (e.success && (e.data != null)) {
            d("Success getting facebook data!");
            this.name = e.data[0].name;
            if (((_ref = e.data[0]) != null ? _ref.affiliations : void 0) != null) {
              this.affiliations = _.map(e.data[0].affiliations, function(a) {
                return a.name;
              }).join(", ");
            }
            return this.fireEvent("state:ready");
          } else {
            er("Error fqling Facebook information.");
            er(e);
            return this.fireEvent("state:error");
          }
        }, this));
      }
    };
    FacebookAccount.prototype.authorize = function() {
      var controller, errorLoggingIn, loggedIn;
      d("Starting facebook authorization");
      FacebookAccount.__super__.authorize.apply(this, arguments);
      d(Titanium.Facebook.isLoggedIn());
      d(Titanium.Facebook.loggedIn);
      d(Titanium.Facebook.session);
      d(Titanium.Facebook.permissions);
      controller = {};
      loggedIn = __bind(function(session) {
        d("Successfully logged in to facebook");
        d(session);
        if (controller.destroy != null) {
          controller.destroy();
        }
        return this.completeAuthorization();
      }, this);
      errorLoggingIn = __bind(function(e) {
        d("Suspected login error. Verifying");
        if (!Titanium.Facebook.isLoggedIn()) {
          er("Error logging in with facebook account!");
          er(e);
          d("Session:");
          d(Titanium.Facebook.session);
          d("Is logged in:");
          d(Titanium.Facebook.isLoggedIn());
          return this.fireEvent("authorization:error", e);
        } else {
          er("False negative on facebook login! Loggin in.");
          return loggedIn(Titanium.Facebook.session);
        }
      }, this);
      return controller = new Citrus.FacebookAuthorizationController(loggedIn, errorLoggingIn);
    };
    return FacebookAccount;
  }();
  Citrus.registerAccount(FacebookAccount);
}).call(this);
