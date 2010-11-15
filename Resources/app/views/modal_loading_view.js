(function() {
  var ModalLoadingView;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  ModalLoadingView = function(text, controller) {
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
    return this;
  };
  __extends(ModalLoadingView, Citrus.GenericWindow);
  ModalLoadingView.prototype.show = function(window) {
    d("Showing loading indicator");
    return window.add(this.view);
  };
  ModalLoadingView.prototype.hide = function(window) {
    d("Hiding loading indicator");
    return window.remove(this.view);
  };
  Citrus.ModalLoadingView = ModalLoadingView;
}).call(this);
