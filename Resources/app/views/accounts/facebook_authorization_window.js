(function() {
  var FacebookAuthorizationWindow;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  FacebookAuthorizationWindow = function() {
    function FacebookAuthorizationWindow(controller) {
      FacebookAuthorizationWindow.__super__.constructor.apply(this, arguments);
      this.win = Ti.UI.createWindow({
        title: "Add Account",
        backgroundColor: "#FFFFFF"
      });
      this.fbButton = Titanium.Facebook.createLoginButton({
        style: 'wide',
        apikey: Citrus.Config.FACEBOOK_API_KEY,
        secret: Citrus.Config.FACEBOOK_APP_SECRET,
        top: 130,
        height: 30,
        width: 300
      });
      this.label = Titanium.UI.createLabel({
        color: '#000',
        font: {
          fontSize: 16,
          fontWeight: 'bold'
        },
        top: 50,
        height: 'auto',
        width: 300,
        text: "Click the Connect with Facebook button below to add your Facebook account to Citrus."
      });
      this.win.add(this.label);
      this.win.add(this.fbButton);
    }
    __extends(FacebookAuthorizationWindow, Citrus.GenericWindow);
    FacebookAuthorizationWindow.prototype.destroyAuthorizeUI = function() {
      return this.win.close({
        animated: false
      });
    };
    return FacebookAuthorizationWindow;
  }();
  Citrus.FacebookAuthorizationWindow = FacebookAuthorizationWindow;
}).call(this);
