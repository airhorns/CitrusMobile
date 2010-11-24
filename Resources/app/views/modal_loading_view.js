(function() {
  var ModalLoadingView;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  ModalLoadingView = function() {
    function ModalLoadingView(text, controller) {
      var bg, box, indicator, message;
      ModalLoadingView.__super__.constructor.call(this, controller);
      this.view = Titanium.UI.createView({
        height: 480,
        width: 320,
        top: 0,
        left: 0
      });
      bg = Titanium.UI.createView({
        height: 480,
        width: 320,
        top: 0,
        left: 0,
        opacity: 0.4,
        backgroundColor: 'black'
      });
      box = Titanium.UI.createView({
        height: 150,
        width: 150,
        top: 100,
        backgroundColor: 'black',
        opacity: 0.75,
        borderRadius: 5
      });
      indicator = Titanium.UI.createActivityIndicator({
        top: 130,
        left: 140,
        width: 40,
        height: 40,
        style: Titanium.UI.iPhone.ActivityIndicatorStyle.BIG
      });
      message = Titanium.UI.createLabel({
        top: 190,
        left: 100,
        width: 120,
        height: 'auto',
        font: {
          fontFamily: 'Helvetica Neue',
          fontSize: 15,
          fontWeight: 'bold'
        },
        text: text,
        textAlign: "center",
        color: 'white'
      });
      this.view.add(bg);
      this.view.add(box);
      this.view.add(indicator);
      this.view.add(message);
      indicator.show();
    }
    __extends(ModalLoadingView, Citrus.GenericWindow);
    ModalLoadingView.prototype.show = function(window) {
      d("Showing loading indicator");
      return window.add(this.view);
    };
    ModalLoadingView.prototype.hide = function(window) {
      d("Hiding loading indicator");
      return window.remove(this.view);
    };
    return ModalLoadingView;
  }();
  Citrus.ModalLoadingView = ModalLoadingView;
}).call(this);
