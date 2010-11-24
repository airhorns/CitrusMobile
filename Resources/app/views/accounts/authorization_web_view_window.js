(function() {
  var AuthorizationWebViewWindow;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  AuthorizationWebViewWindow = function() {
    function AuthorizationWebViewWindow(controller) {
      var animation, transform;
      AuthorizationWebViewWindow.__super__.constructor.apply(this, arguments);
      this.win = Ti.UI.createWindow({
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
      this.closeLabel = Ti.UI.createLabel({
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
      d("Opening window");
      this.win.open();
      this.authorizationWebView = Ti.UI.createWebView({
        autoDetect: [Ti.UI.AUTODETECT_NONE]
      });
      this.authorizationWebView.addEventListener('load', __bind(function(e) {
        return this.fireEvent("load", e);
      }, this));
      this.authorizationView.add(this.authorizationWebView);
      this.loadCallback = __bind(function() {
        return this.destroyAuthorizeUI();
      }, this);
      this.closeLabel.addEventListener('click', this.loadCallback);
      this.authorizationView.add(this.closeLabel);
      this.win.add(this.authorizationView);
      animation = Ti.UI.createAnimation();
      animation.transform = Ti.UI.create2DMatrix();
      animation.duration = 500;
      d("Animating auth web view");
      this.authorizationView.animate(animation);
    }
    __extends(AuthorizationWebViewWindow, Citrus.GenericWindow);
    AuthorizationWebViewWindow.prototype.loadURL = function(url) {
      this.authorizationWebView.url = url;
      return this.authorizationWebView.reload();
    };
    AuthorizationWebViewWindow.prototype.destroyAuthorizeUI = function() {
      Ti.API.debug('Destroying Authorize UI');
      if (this.win == null) {
        return true;
      }
      try {
        this.authorizationWebView.removeEventListener('load', this.loadCallback);
        return this.win.close();
      } catch (ex) {
        Ti.API.debug('Cannot destroy the authorize UI. Ignoring. Error:');
        return Ti.API.error(ex);
      }
    };
    return AuthorizationWebViewWindow;
  }();
  Citrus.AuthorizationWebViewWindow = AuthorizationWebViewWindow;
}).call(this);
