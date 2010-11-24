(function() {
  var PlaceholderWindow;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  PlaceholderWindow = function() {
    function PlaceholderWindow(controller, theTitle, theText) {
      var label;
      PlaceholderWindow.__super__.constructor.apply(this, arguments);
      this.win = Ti.UI.createWindow({
        title: theTitle,
        backgroundColor: '#fff'
      });
      label = Titanium.UI.createLabel({
        color: '#999',
        text: theText,
        font: {
          fontSize: 20,
          fontFamily: 'Helvetica Neue'
        },
        textAlign: 'center',
        width: 'auto'
      });
      this.win.add(label);
    }
    __extends(PlaceholderWindow, Citrus.GenericWindow);
    return PlaceholderWindow;
  }();
  Citrus.PlaceholderWindow = PlaceholderWindow;
}).call(this);
