(function() {
  var CodeReaderWindow;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  CodeReaderWindow = function() {
    function CodeReaderWindow(controller, theTitle, theText) {
      CodeReaderWindow.__super__.constructor.apply(this, arguments);
      this.win.addEventListener("focus", __bind(function(e) {
        return this.controller.focused(e);
      }, this));
    }
    __extends(CodeReaderWindow, Citrus.PlaceholderWindow);
    return CodeReaderWindow;
  }();
  Citrus.CodeReaderWindow = CodeReaderWindow;
}).call(this);
