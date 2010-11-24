(function() {
  var CustomObject;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  CustomObject = function() {
    function CustomObject() {
      this.tid = String(new Date().valueOf());
    }
    __extends(CustomObject, Citrus.Observable);
    return CustomObject;
  }();
  Citrus.Object = CustomObject;
}).call(this);
