(function() {
  var XAuthorizationWindow;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  XAuthorizationWindow = function() {
    function XAuthorizationWindow(controller) {
      XAuthorizationWindow.__super__.constructor.apply(this, arguments);
      this.saveButton = Titanium.UI.createButton({
        title: "Save"
      });
      this.saveButton.addEventListener('click', __bind(function(e) {
        var f, _i, _len, _ref;
        _ref = this.fields;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          f = _ref[_i];
          f.blur();
        }
        return this.fireEvent("info:collected", e);
      }, this));
      this.win.rightNavButton = this.saveButton;
    }
    __extends(XAuthorizationWindow, Citrus.DataCollectionWindow);
    XAuthorizationWindow.prototype.fieldsToCollect = {
      username: {},
      password: {
        passwordMask: true
      }
    };
    XAuthorizationWindow.prototype.title = "XAuth Window";
    return XAuthorizationWindow;
  }();
  Citrus.XAuthorizationWindow = XAuthorizationWindow;
}).call(this);
