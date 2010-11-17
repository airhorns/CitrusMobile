(function() {
  var XAuthorizationWindow;
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
  XAuthorizationWindow = function(controller) {
    XAuthorizationWindow.__super__.constructor.apply(this, arguments);
    this.saveButton = Titanium.UI.createButton({
      title: "Save"
    });
    this.saveButton.addEventListener('click', __bind(function(e) {
      var _i, _len, _ref, f;
      _ref = this.fields;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        f = _ref[_i];
        f.blur();
      }
      return this.fireEvent("info:collected", e);
    }, this));
    this.win.rightNavButton = this.saveButton;
    return this;
  };
  __extends(XAuthorizationWindow, Citrus.DataCollectionWindow);
  XAuthorizationWindow.prototype.fieldsToCollect = {
    username: {},
    password: {
      passwordMask: true
    }
  };
  XAuthorizationWindow.prototype.title = "XAuth Window";
  Citrus.XAuthorizationWindow = XAuthorizationWindow;
}).call(this);
