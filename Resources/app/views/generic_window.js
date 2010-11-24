(function() {
  var GenericWindow;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  GenericWindow = function() {
    function GenericWindow(controller) {
      if (controller) {
        this.controller = controller;
      } else {
        Titanium.API.warn("Warning! No controller was passed to the constructor of a window!");
      }
    }
    __extends(GenericWindow, Citrus.Observable);
    return GenericWindow;
  }();
  Citrus.GenericWindow = GenericWindow;
}).call(this);
