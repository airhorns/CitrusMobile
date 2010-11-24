(function() {
  var CodesWindow;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  CodesWindow = function() {
    function CodesWindow() {
      CodesWindow.__super__.constructor.apply(this, arguments);
      this.loading = new Citrus.ModalLoadingView("Loading info...", this);
      this.loading.show(this.win);
    }
    __extends(CodesWindow, Citrus.PlaceholderWindow);
    return CodesWindow;
  }();
  Citrus.CodesWindow = CodesWindow;
}).call(this);
