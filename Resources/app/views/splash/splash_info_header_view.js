(function() {
  var SplashInfoHeaderView;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  SplashInfoHeaderView = function() {
    function SplashInfoHeaderView(splash) {
      var description, photo, text_offset, title;
      this.view = Titanium.UI.createView({
        height: 65,
        top: 0
      });
      this.splash = splash;
      this.view.object = this;
      if (splash.photo != null) {
        text_offset = 74;
        photo = Ti.UI.createImageView({
          image: splash.photo,
          width: 60,
          height: 'auto',
          top: 6,
          left: 7,
          borderColor: 'black',
          borderRadius: 5,
          borderWidth: 1
        });
        this.view.add(photo);
      } else {
        text_offset = 5;
      }
      title = Ti.UI.createLabel({
        color: '#000',
        text: splash.name,
        font: {
          fontSize: 30,
          fontWeight: 'bold'
        },
        minimumFontSize: 16,
        top: 4,
        left: text_offset,
        height: 32,
        width: 320 - text_offset - 4,
        shadowColor: '#999',
        shadowOffset: {
          x: 1,
          y: 1
        }
      });
      this.view.add(title);
      description = Ti.UI.createLabel({
        color: '#000',
        text: splash.text,
        font: {
          fontSize: 20,
          fontWeight: 'bold'
        },
        minimumFontSize: 12,
        top: 40,
        left: text_offset,
        height: 22,
        width: 320 - text_offset - 4
      });
      this.view.add(description);
    }
    __extends(SplashInfoHeaderView, Citrus.Object);
    return SplashInfoHeaderView;
  }();
  Citrus.SplashInfoHeaderView = SplashInfoHeaderView;
}).call(this);
