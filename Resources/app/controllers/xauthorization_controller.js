(function() {
  var XAuthorizationController;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Ti.include("/app/views/accounts/xauthorization_window.js");
  XAuthorizationController = function() {
    function XAuthorizationController(collectSuccess, collectCancel, viewClass) {
      viewClass != null ? viewClass : viewClass = Citrus.XAuthorizationWindow;
      this.window = new viewClass(this);
      this.window.addEventListener("info:collected", __bind(function(e) {
        if (this.validateInfo()) {
          return collectSuccess(this.data());
        }
      }, this));
      root.tabGroup.activeTab.open(this.window.win, {
        animated: true
      });
      this.loading = new Citrus.ModalLoadingView("Authorizing Account...", this);
    }
    __extends(XAuthorizationController, Citrus.Controller);
    XAuthorizationController.prototype.validateInfo = function() {
      var name, val, _ref;
      d(this.data());
      _ref = this.data();
      for (name in _ref) {
        if (!__hasProp.call(_ref, name)) continue;
        val = _ref[name];
        if (val === "") {
          alert("All fields are required");
          return false;
        }
      }
      return true;
    };
    XAuthorizationController.prototype.data = function() {
      return this.window.data();
    };
    XAuthorizationController.prototype.showCredentialsError = function() {
      this.hideLoading();
      return alert("Your username and password could not be verified. Please ensure they are correct and try again.");
    };
    XAuthorizationController.prototype.showCommunicationError = function() {
      this.hideLoading();
      return alert("There was an error contacting the Twitter servers. Please try again.");
    };
    XAuthorizationController.prototype.showLoading = function() {
      return this.loading.show(this.window.win);
    };
    XAuthorizationController.prototype.hideLoading = function() {
      return this.loading.hide(this.window.win);
    };
    XAuthorizationController.prototype.destroy = function() {
      return this.window.win.close();
    };
    return XAuthorizationController;
  }();
  Citrus.XAuthorizationController = XAuthorizationController;
}).call(this);
