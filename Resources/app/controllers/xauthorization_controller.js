(function() {
  var XAuthorizationController;
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  Ti.include("/app/views/accounts/xauthorization_window.js");
  XAuthorizationController = function(collectSuccess, collectCancel, viewClass) {
    viewClass = (typeof viewClass !== "undefined" && viewClass !== null) ? viewClass : Citrus.XAuthorizationWindow;
    this.window = new viewClass(this);
    this.window.addEventListener("info:collected", __bind(function(e) {
      return this.validateInfo() ? collectSuccess(this.data()) : null;
    }, this));
    root.tabGroup.activeTab.open(this.window.win, {
      animated: true
    });
    this.loading = new Citrus.ModalLoadingView("Authorizing Account...", this);
    return this;
  };
  __extends(XAuthorizationController, Citrus.Controller);
  XAuthorizationController.prototype.validateInfo = function() {
    var _ref, name, val;
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
  Citrus.XAuthorizationController = XAuthorizationController;
}).call(this);
