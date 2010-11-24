(function() {
  var EmailCollectionController;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Ti.include("/app/views/accounts/email_collection_window.js");
  EmailCollectionController = function() {
    function EmailCollectionController(collectSuccess, collectCancel, viewClass) {
      viewClass != null ? viewClass : viewClass = Citrus.EmailCollectionWindow;
      this.window = new viewClass(this);
      this.window.addEventListener("info:collected", __bind(function(e) {
        if (this.validateInfo()) {
          return collectSuccess(this.data());
        }
      }, this));
      root.tabGroup.activeTab.open(this.window.win, {
        animated: true
      });
    }
    __extends(EmailCollectionController, Citrus.Controller);
    EmailCollectionController.prototype.emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    EmailCollectionController.prototype.validateInfo = function() {
      var name, val, _ref;
      _ref = this.data();
      for (name in _ref) {
        if (!__hasProp.call(_ref, name)) continue;
        val = _ref[name];
        if (name === "email") {
          d("checking email", val, this.emailRegex, this.emailRegex.test(val));
          if (!this.emailRegex.test(val)) {
            alert("Please enter a valid email.");
            return false;
          }
        } else if (val === "") {
          alert("All fields are required");
          return false;
        }
      }
      return true;
    };
    EmailCollectionController.prototype.data = function() {
      var d, k, v;
      d = this.window.data();
      for (k in d) {
        if (!__hasProp.call(d, k)) continue;
        v = d[k];
        if (k === "email") {
          d[k] = v.toLowerCase();
        }
      }
      return d;
    };
    EmailCollectionController.prototype.destroy = function() {
      return this.window.win.close();
    };
    return EmailCollectionController;
  }();
  Citrus.EmailCollectionController = EmailCollectionController;
}).call(this);
